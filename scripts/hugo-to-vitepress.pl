#!/usr/bin/env perl
# Hugo (relearn) -> VitePress conversion for the CPSC 310 course reader.
#
# Reproducible: re-copy pristine _index.md files from the github-pages branch,
# run this over them, and you get the same result every time.
#
# Handles both {{< >}} and {{% %}} delimiter styles.
#
# Deliberately does NOT auto-repair broken paths. The one live ./figures/ ref in
# the reader was a dead leftover superseded by a figure shortcode on the next
# line; "fixing" the path resurrected it as a duplicate image. Broken live refs
# are reported for a human to judge, and the known ones are handled explicitly
# in the FIXES section below.
use strict;
use warnings;

my (%count, @unresolved, @report);

# Hugo resolved {{% ref "name" %}} by page name. Rebuild that lookup table from
# the converted tree so refs land on the right VitePress path.
my %PAGES;
for my $p (glob 'docs/textbook/*/index.md docs/textbook/*/*/index.md') {
    (my $dir  = $p)   =~ s{^docs(/textbook/.*)/index\.md$}{$1};
    (my $name = $dir) =~ s{.*/}{};
    $PAGES{$name} = "$dir/";
}

for my $file (@ARGV) {
    open my $fh, '<', $file or die "$file: $!";
    my $src = do { local $/; <$fh> };
    close $fh;
    my $orig = $src;

    # --- shortcodes -------------------------------------------------------
    # {{< youtube ID >}} -> <Youtube id="ID" /> (component registered globally)
    $count{youtube} += $src =~ s{\{\{[<%]\s*youtube\s+(\S+?)\s*[>%]\}\}}
                                {<Youtube id="$1" />}gx;

    # {{< figure ... >}} -> markdown image. Attribute-order-agnostic, because the
    # reader uses src alone, src+alt, and one src+alt+width. Markdown can't carry
    # width, so anything with extra attributes becomes an <img> to keep the
    # author's sizing (Vite resolves relative src in raw HTML too).
    $count{figure} += $src =~ s{\{\{[<%]\s*figure\s+([^\}]*?)\s*[>%]\}\}}{
        my %a = ($1 =~ m{(\w+)="([^"]*)"}g);
        my $s = delete $a{src} // '';
        my $t = delete $a{alt} // '';
        if (%a) {
            my $extra = join ' ', map { qq{$_="$a{$_}"} } sort keys %a;
            # Vite resolves bare relative paths in markdown images but not in raw
            # HTML src, so make the relative path explicit.
            $s = "./$s" unless $s =~ m{^(?:\.{1,2}/|/|https?:)};
            qq{<img src="$s" alt="$t" $extra>};
        } else {
            "![$t]($s)";
        }
    }gex;

    # {{< expand title="X" >}} ... {{< /expand >}} -> ::: details X ... :::
    $count{expand} += $src =~ s{\{\{[<%]\s*expand\s+title="([^"]*)"\s*[>%]\}\}}
                               {::: details $1\n}gx;
    $src =~ s{\{\{[<%]\s*/expand\s*[>%]\}\}}{\n:::}gx;

    # {{% notice type ["Title"] ["icon"] %}} -> ::: type Title   (icon dropped)
    $count{notice} += $src =~ s{\{\{[<%]\s*notice\s+(\w+)(?:\s+"([^"]*)")?(?:\s+"[^"]*")?\s*[>%]\}\}}
                               {defined $2 && length $2 ? "::: $1 $2" : "::: $1"}gex;
    $src =~ s{\{\{[<%]\s*/notice\s*[>%]\}\}}{:::}gx;

    # {{% ref "page[#anchor]" %}} -> site-absolute link; VitePress prepends base.
    # VitePress lowercases heading slugs, so lowercase the anchor.
    $count{ref} += $src =~ s{\{\{[<%]\s*ref\s+"([^"\#]+)(\#[^"]*)?"\s*[>%]\}\}}
                            {exists $PAGES{$1}
                               ? $PAGES{$1} . (defined $2 ? lc($2) : '')
                               : do { push @unresolved, "$file -> $1"; "UNRESOLVED-REF:$1" }}gex;

    # --- explicit fixes ---------------------------------------------------
    # Stale pointers into the pre-Hugo resources/readings/ layout. Hugo never
    # flagged these; VitePress fails the build on them.
    $count{deadlink} += $src =~ s{\]\(readings/DesignPrinciples\.md\)}
                                 {](/textbook/high-level-design/principles/)}gx;
    $count{deadlink} += $src =~ s{\]\(Testing\.md\#testability\)}
                                 {](/textbook/testing/testability/)}gx;

    # Dead <img> superseded by the figure shortcode on the following line.
    $count{dup_img} += $src =~ s{^<img\s+src="\./figures/dp_observer2\.png"[^>]*>\n\n}{}gmx;

    # Shiki has no 'assembly_x86'; the x86 grammar is 'asm'.
    $count{lang} += $src =~ s{^```assembly_x86$}{```asm}gmx;

    # --- report, don't repair --------------------------------------------
    my $live = $src;
    $live =~ s{<!--.*?-->}{}gs;         # HTML comments
    $live =~ s{^\[//\]:.*$}{}gm;        # markdown comment hack
    push @report, "$file -> $_" for $live =~ m{([^\s"]*figures/[^\s")]*)}g;

    if ($src ne $orig) {
        open my $out, '>', $file or die "$file: $!";
        print $out $src;
        close $out;
    }
}

print "conversions applied:\n";
printf "  %-10s %d\n", $_, $count{$_} for sort grep { $count{$_} } keys %count;
if (@unresolved) {
    print "\nUNRESOLVED refs (no matching page):\n  $_\n" for @unresolved;
}
if (@report) {
    print "\nLive refs to the nonexistent figures/ dir — review by hand:\n";
    print "  $_\n" for @report;
}
