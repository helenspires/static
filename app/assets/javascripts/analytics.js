(function() {
    function trackTaskCompletion(needID, format) {
        if (format == "guide") {
            trackGuideFormatSuccess(needID);
        }
    }

    function trackFormatEntry(needID, format)
    {
        _gaq.push(['_trackEvent', 'MS_'+format, needID, 'Entry']);
    }

    function trackGuideFormatSuccess(needID)
    {
        var success = { "success": false };
        setTimeout(function() {
            onSuccess(success, needID);
        }, 7000);
        $("#content a").click(function() {
            onSuccess(success, needID);
            try {
              if ($(this).data('events').click.length === 1) {
                window.setTimeout(function () {
                  document.location = $(this).attr("href");
                }, 50)
              }
            } catch(err) {}
        });
    }

    function onSuccess(dict, needID) {
        if (dict.success) {
            return;
        }
        dict.success = true;
        _gaq.push(['_trackEvent', 'MS_guide', needID, 'Success']);
    }

    function userCameFromThePageWithinTheSameArtefact() {
        var artefactURL = document.URL.split('/').slice(0,4).join('/');
        return (document.referrer.indexOf(artefactURL) == 0);
    }


    // Track format entry before DOM ready
    var userFromSameArtefact = userCameFromThePageWithinTheSameArtefact();
    if (!userFromSameArtefact) {
        trackFormatEntry(GOVUK.Analytics.NeedID, GOVUK.Analytics.Format);
    }

    // Track format success on DOM ready
    $(function() {
        if (!userFromSameArtefact) {
            trackTaskCompletion(GOVUK.Analytics.NeedID, GOVUK.Analytics.Format);
        }

    });
})();
