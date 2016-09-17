app.service('searchService', function ($http) {
    var cwStart = 'http://www.cwjobs.co.uk/jobs/';
    var cwEnd = '/in-london';
    return {
        getCWJobs: function (keywords) {
            return $http({
                method: 'GET'
                , url:  window.location.href + "proxy.php?url=" + cwStart + keywords + cwEnd  
            });
        }
    };
});