app.service('searchService', function ($http) {
    var cwStart = 'http://www.cwjobs.co.uk/jobs/';
    var cwEnd = '/in-london';
    
    var efinancialStart = 'http://www.efinancialcareers.co.uk/search?keywords=';
    
    return {
        getCWJobs: function (keywords) {
            return $http({
                method: 'GET'
                , url: window.location.href + "proxy.php?url=" + cwStart + keywords + cwEnd
            });
        }
        , getEfinancial: function (keywords) {
            return $http({
                method: 'GET'
                , url: window.location.href + "proxy.php?url=" + efinancialStart + keywords
            });
        }
    };
});