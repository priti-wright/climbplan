
export function initGA(){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-64580382-1', 'auto');
    ga('send', 'pageview');
}

export function trackOutboundLink(link){
  ga('send', 'event', 'outbound', 'click', link);
}

export function trackSearchComplete(place){
  ga('send', 'event', 'search', 'completed', place.place_id);
}
