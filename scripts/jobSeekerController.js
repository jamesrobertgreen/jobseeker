app.controller('jobSeekerController', function ($scope, searchService) {
    $scope.search = function (keywords) {
        searchService.getCWJobs(keywords).then(function (result) {
            $scope.cwJobsResult = "CWJobs : " + findTag(result.data.contents, '"description"', '>', 23, 3);
        }, function () {
            console.log("fail")
        });
        searchService.getEfinancial(keywords).then(function (result) {
            $scope.efinancialResult = "Efinancial Careers : " + findTag(result.data.contents, '"numFound"','<', 12, 0);
        }, function () {
            console.log("fail")
        });
    };
    //find a tag in HTML string and return it's contents
    var findTag = function (htmlString, tag, terminator, startOffset, endOffset) {
        var start = htmlString.indexOf(tag)
        var end = htmlString.indexOf(terminator, start);
        return htmlString.slice(start + startOffset, end - endOffset);
    };
});