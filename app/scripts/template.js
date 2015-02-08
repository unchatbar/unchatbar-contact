angular.module('unchatbar-phone-book').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/unchatbar-phone-book/active-user.html',
    "<div data-ng-init=\"getClientAndGroups()\">\n" +
    "\n" +
    "  <div data-ng-show=\"selectedUser\">\n" +
    "\n" +
    "    <i data-ng-click=\"offcanvas=!offcanvas\" class=\"fa fa-user fa-4x\"></i>\n" +
    "\n" +
    "    <p>{{clientMap[selectedUser].label}}</p>\n" +
    "    <div class=\"btn btn-success call\" data-ng-click=\"streamToClient(selectedUser)\">\n" +
    "      <i class=\"fa fa-phone fa-3x\"></i>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"btn btn-success call\" data-ng-click=\"removeClient(selectedUser)\">\n" +
    "      <i class=\" fa fa-trash fa-3x\"></i>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "  <div data-ng-show=\"selectedGroup\">\n" +
    "    <i data-ng-click=\"offcanvas=!offcanvas\" class=\"fa fa-users fa-4x\"></i>\n" +
    "\n" +
    "    <p>{{groupMap[selectedGroup].label}}</p>\n" +
    "    <div class=\"btn btn-success call\" data-ng-click=\"streamToConferenceByGroupId(selectedGroup)\">\n" +
    "      <i class=\"fa fa-phone fa-3x\"></i>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"btn btn-success call\" data-ng-click=\"removeGroup(selectedGroup)\">\n" +
    "      <i class=\" fa fa-trash fa-3x\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"btn btn-success call\" ng-if=\"groupMap[selectedGroup].editable === true\">\n" +
    "      <span ng-dropdown-multiselect=\"\"\n" +
    "            extra-settings=\"{showCheckAll:false,showUncheckAll : false}\"\n" +
    "            events=\"{onItemSelect : addUserToGroup,onItemDeselect : removeUserFromGroup}\"\n" +
    "            options=\"clientMap | filter:ownPeerId\"\n" +
    "            translation-texts=\"{buttonDefaultText: group.label,dynamicButtonTextSuffix: 'users'}\"\n" +
    "            selected-model=\"groupMap[selectedGroup].users\"></span>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/unchatbar-phone-book/book.html',
    "<div data-ng-init=\"init()\">\n" +
    "  <tabset justified=\"true\">\n" +
    "    <tab heading=\"user\" active=\"selectedUser\">\n" +
    "\n" +
    "\n" +
    "      <div ng-repeat=\"(peerId,connection) in clientMap\">\n" +
    "        <a ui-sref-active=\"active\" ui-sref='chat.user({peerId: peerId})'\n" +
    "           class=\"list-group-item\">{{connection.label}}</a>\n" +
    "      </div>\n" +
    "    </tab>\n" +
    "    <tab heading=\"Groupps\" active=\"selectedGroup\">\n" +
    "      <div class=\"input-group dialer\">\n" +
    "        <input type=\"text\" class=\"form-control\" data-ng-model=\"form.newGroupName\"\n" +
    "               placeholder=\"Groupname\">\n" +
    "\n" +
    "        <div data-ng-click=\"createGroup()\" class=\"input-group-addon\">\n" +
    "          <i class=\"fa fa-check fa-1x\"></i>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div ng-repeat=\"(groupId,group) in groupMap\">\n" +
    "        <a ui-sref-active=\"active\" ui-sref='chat.group({groupId: groupId})' class=\"list-group-item\">{{group.label}}</a>\n" +
    "      </div>\n" +
    "    </tab>\n" +
    "  </tabset>\n" +
    "</div>\n"
  );


  $templateCache.put('views/unchatbar-phone-book/layout/chat/content.html',
    "<div class=\"col-xs-12 col-sm-9\">\n" +
    "\n" +
    "  <div class=\"jumbotron\">\n" +
    "    <active-user></active-user>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12 col-lg-12\">\n" +
    "      <h2>Video/Audio</h2>\n" +
    "      <stream></stream>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12 col-lg-12\">\n" +
    "      <h2>Chat</h2>\n" +
    "      <text-message-list></text-message-list>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/unchatbar-phone-book/layout/chat/footer.html',
    "<footer>\n" +
    "    <p>&copy; Company 2014</p>\n" +
    "</footer>\n"
  );


  $templateCache.put('views/unchatbar-phone-book/layout/chat/header.html',
    "<nav class=\"navbar navbar-fixed-top navbar-inverse\">\n" +
    "    Contact\n" +
    "</nav>\n"
  );


  $templateCache.put('views/unchatbar-phone-book/layout/chat/index.html',
    "<div data-ui-view=\"header\"></div>\n" +
    "<div class=\"container\" data-ng-init=\"offcanvas=false\">\n" +
    "\n" +
    "  <div class=\"row row-offcanvas row-offcanvas-left\" data-ng-class=\"{'active': offcanvas}\">\n" +
    "    <p class=\"pull-left visible-xs\">\n" +
    "      <i data-ng-click=\"offcanvas=!offcanvas\" class=\"fa fa-book fa-4x\"></i>\n" +
    "    </p>\n" +
    "\n" +
    "    <div data-ui-view=\"sidebar\"></div>\n" +
    "    <div data-ui-view=\"content\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/unchatbar-phone-book/layout/chat/sidebar.html',
    "<div class=\"col-xs-6 col-sm-3 sidebar-offcanvas active\" >\n" +
    "    <div class=\"list-group\">\n" +
    "        <dialer></dialer>\n" +
    "        <phone-book></phone-book>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/unchatbar-phone-book/layout/login.html',
    "<div class=\"container\" data-ng-controller=\"broker\">\n" +
    "\n" +
    "  <form class=\"form-signin\">\n" +
    "    <h2 class=\"form-signin-heading\">Please sign in</h2>\n" +
    "    <label for=\"peerId\" class=\"sr-only\">your Phonenumber</label>\n" +
    "    <input type=\"text\" id=\"peerId\" class=\"form-control\"\n" +
    "           data-ng-model=\"peerId\"\n" +
    "           placeholder=\"Username\" required autofocus>\n" +
    "    <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\"\n" +
    "            data-ng-click=\"login();\">Sign in\n" +
    "    </button>\n" +
    "  </form>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/unchatbar-phone-book/streamOption.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">call option</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-6 text-left\">\n" +
    "      <button type=\"button\" class=\"btn btn-default btn-lg\" aria-label=\"Left Align\" ng-click=\"videoCall()\">\n" +
    "        <i class=\"glyphicon glyphicon-facetime-video\"></i>Video\n" +
    "      </button>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-6 text-right\">\n" +
    "      <button type=\"button\" class=\"btn btn-default btn-lg\" ng-click=\"audiCall()\" aria-label=\"Left Align\"\n" +
    "              ng-click=\"videoCall()\">\n" +
    "        <i class=\"glyphicon glyphicon-earphone\"></i>Audio\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);
