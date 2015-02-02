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
