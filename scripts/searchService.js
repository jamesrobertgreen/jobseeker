app.service('searchService', function ($http) {
    var cwStart = 'cwjobs.co.uk%2Fjobs%2F';
    var cwEnd = '%2Fin-london';
    var efinancialStart = 'http://www.efinancialcareers.co.uk/search?keywords=';
    var jobSiteStart = 'http%3A%2F%2Fwww.jobsite.co.uk%2Fvacancies%3Fsearch_type%3Dquick%26query%3D';    
    var jobSiteEnd = '%26location%3DLondon%26fromTypeahead%3D0%26radius%3D20';
    var send_cookies_str = "&send_cookies=false";
    var user_agent_str = "&user_agent=test";
    var full_headers_str = "&full_headers=1";
    var full_status_str = "&full_status=1";
    var params =  send_cookies_str + full_headers_str + full_status_str;
    
    return {
        getCWJobs: function (keywords) {
            return $http({
                method: 'GET'
                , url: window.location.href + "proxy.php?url=" + cwStart + keywords + cwEnd + params
            });
        }
        , getEfinancial: function (keywords) {
            return $http({
                method: 'GET'
                , url: window.location.href + "proxy.php?url=" + efinancialStart + keywords + params + user_agent_str
            });
        }
        , getjobSite: function (keywords) {
            return $http({
                method: 'GET'
                , url: window.location.href + "proxy.php?url=" + jobSiteStart + keywords + jobSiteEnd + params
            });
        }
    };
});