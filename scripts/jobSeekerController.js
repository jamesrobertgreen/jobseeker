app.controller('jobSeekerController', function ($scope, searchService) {
    $scope.search = function (keywords) {
        searchService.getCWJobs(keywords).then(function (result) {
            console.log(result.data.contents);
            $scope.cwJobsResult = findTag(result.data.contents, '"description"',23);
        }, function () {
            console.log("fail")
        })
    };
    //find a tag in HTML string and return it's contents
    var findTag = function (htmlString, tag,offset) {
        var start = htmlString.indexOf(tag)
        console.log(start);
        var end = htmlString.indexOf('>', start);
        console.log(end);
        return htmlString.slice(start+offset, end-3);
    };
});