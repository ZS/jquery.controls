// uses knockoutjs: http://knockoutjs.com

(function ($) {
    $.fn.extend({
        smartscroller: function (options) {
            //#region Construction

            var defaults = {
                url: "",
                ajaxOptions: {},
                viewModel: null,
                sortControl: null,
                page: 0,
                itemsPerPage: 10,
                bottomOffset: 30,
                previousLink: null,
                clientSideSort: null
            };

            var opts = defaults;

            if (options) {
                opts = $.extend(defaults, options);
            }

            //#endregion

            //#region Setup
            ko.applyBindings(opts.viewModel);

            // bind events
            opts.sortControl.change(updateSorting);
            opts.previousLink.live("click", gotoPrevious);

            opts.scrollContainer.scroll(scrollCheck);

            // need to keep track of head and tail of list
            var headPage;
            var tailPage;

            //#endregion

            //#region Public

            this.refresh = function () {
                opts.viewModel.hasPrevious(false);
                opts.viewModel.hasNext(false);

                ajaxRefresh("all", opts.page, function () {
                    headPage = opts.page;
                    tailPage = opts.page;
                });
            };

            //#endregion

            //#region Private

            function scrollCheck() {
                if (getBottomSpacing() - opts.scrollContainer.scrollTop() < opts.bottomOffset && opts.viewModel.hasNext()) {
                    gotoNext();
                }
            }

            function getBottomSpacing() {
                return opts.listContainer.height() - opts.scrollContainer.height();
            }

            function gotoPrevious() {
                headPage--;

                opts.viewModel.hasPrevious(false);
                var lastListHeight = opts.listContainer.height();

                ajaxRefresh("previous", headPage, function () {
                    // prevents "scroll up" skipping behavior
                    var newScrollPosition = opts.listContainer.height() - lastListHeight;
                    opts.scrollContainer.scrollTop(newScrollPosition);
                });

                return false;
            }

            function gotoNext() {
                tailPage++;
                ajaxRefresh("next", tailPage);
            }

            function ajaxRefresh(refreshType, page, callback) {
                if (refreshType === "all" || refreshType === "previous") {
                    opts.viewModel.gettingPrevious(true);
                } else if (refreshType === "next") {
                    opts.viewModel.gettingNext(true);
                }

                var data = {
                    page: page,
                    itemsPerPage: opts.itemsPerPage,
                    sortOrder: opts.sortControl.find("option:selected").val()
                };

                $.extend(data, opts.ajaxOptions);

                $.ajax({
                    type: "POST",
                    url: opts.url,
                    data: data,
                    success: function (result) {

                        if (refreshType === "all") {

                            opts.viewModel.hasPrevious(result.hasPrevious);
                            opts.viewModel.hasNext(result.hasNext);

                            opts.viewModel.gettingPrevious(false);
                            opts.viewModel.data(result.data);

                            callback();

                        } else if (refreshType === "next") {

                            opts.viewModel.hasNext(result.hasNext);
                            opts.viewModel.gettingNext(false);

                            var newData = opts.viewModel.data();

                            for (var index = 0; index < result.data.length; index++) {
                                newData.push(result.data[index]);
                            }

                            opts.viewModel.data(newData);

                        } else if (refreshType === "previous") {

                            opts.viewModel.hasPrevious(result.hasPrevious);
                            opts.viewModel.gettingPrevious(false);

                            var newData = opts.viewModel.data();

                            // need to work from the tail
                            for (var index = result.data.length - 1; index >= 0; index--) {
                                newData.unshift(result.data[index]);
                            }

                            opts.viewModel.data(newData);
                            callback();
                        }
                    }
                });
            }

            function updateSorting() {
                // use client side sort for shorter lists
                // or for when all the data has been loaded
                if (!opts.viewModel.hasPrevious() && !opts.viewModel.hasNext()) {
                    opts.clientSideSort($(this).find("option:selected").val());
                    opts.scrollContainer.scrollTop(0);
                    return;
                }

                opts.viewModel.hasPrevious(false);
                opts.viewModel.hasNext(false);

                ajaxRefresh("all", 0, function () {
                    // we have to do this otherwise the plugin
                    // will try to pull next data if the scrollContainer
                    // is at the bottom
                    opts.scrollContainer.scrollTop(0);

                    tailPage = 0;
                    headPage = 0;
                });
            }

            //#endregion
            return this;
        }
    });
})(jQuery);