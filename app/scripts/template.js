angular.module('unchatbar-contact').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/unchatbar-contact/client/list.html',
    "<div ng-init=\"init()\">\n" +
    "    <div ng-repeat=\"(clientId,clientItem) in clientMap\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-9\">\n" +
    "                <a ui-sref-active=\"active\" ui-sref='contact.client({clientId: clientId})'\n" +
    "                   class=\"list-group-item\">{{clientItem.label}}\n" +
    "                </a>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-3\">\n" +
    "                <i class=\" fa fa-trash fa-2x\" data-ng-click=\"removeClient(clientId)\"></i>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-contact/client/selected.html',
    "<div data-ng-init=\"init()\" data-ng-show=\"client.id\">\n" +
    "    <span>\n" +
    "        <b>{{client.label}}</b>\n" +
    "    </span>\n" +
    "    <span>\n" +
    "        <i class=\" fa fa-trash fa-2x\" data-ng-click=\"removeClient(client.id)\"></i>\n" +
    "    </span>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-contact/group/add.html',
    "<div class=\"input-group\">\n" +
    "    <input type=\"text\" class=\"form-control\" data-ng-model=\"newGroupName\"\n" +
    "           placeholder=\"Groupname\">\n" +
    "\n" +
    "    <div data-ng-click=\"createGroup();newGroupName='';\" class=\"input-group-addon\">\n" +
    "        <i class=\"fa fa-check fa-1x\"></i>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-contact/group/list.html',
    "<div>\n" +
    "    <div data-ng-init=\"init()\" ng-repeat=\"(groupId,group) in groupMap\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-9\">\n" +
    "                <a ui-sref-active=\"active\" ui-sref='contact.group({groupId: groupId})'\n" +
    "                   class=\"list-group-item\">{{group.label}}\n" +
    "                </a>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-3\">\n" +
    "                <i class=\" fa fa-trash fa-2x\" data-ng-click=\"removeGroup(groupId)\"></i>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-contact/group/selected.html',
    "<div>\n" +
    "    <div data-ng-init=\"init()\" data-ng-show=\"groupItem\">\n" +
    "        <p>{{groupItem.label}}</p>\n" +
    "    <span class=\"btn btn-success call\" data-ng-click=\"removeGroup(groupItem)\">\n" +
    "        <i class=\" fa fa-trash fa-3x\"></i>\n" +
    "    </span>\n" +
    "    <span ng-if=\"groupItem.editable === true\">\n" +
    "      <span ng-dropdown-multiselect=\"\"\n" +
    "            extra-settings=\"{showCheckAll:false,showUncheckAll : false}\"\n" +
    "            events=\"{onItemSelect : addUserToGroup,onItemDeselect : removeUserFromGroup}\"\n" +
    "            options=\"clientMap | filter:ownPeerId\"\n" +
    "            translation-texts=\"{buttonDefaultText: group.label,dynamicButtonTextSuffix: 'users'}\"\n" +
    "            selected-model=\"groupItem.users\"></span>\n" +
    "    </span>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-contact/index.html',
    "<div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <h2>Client List</h2>\n" +
    "            <dialer></dialer>\n" +
    "            <un-contact-client-list></un-contact-client-list>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <h2>Selected Client</h2>\n" +
    "            <un-contact-client-selected></un-contact-client-selected>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <h2>Group Group</h2>\n" +
    "            <un-contact-group-add></un-contact-group-add>\n" +
    "            <un-contact-group-list></un-contact-group-list>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <h2>Selected Group</h2>\n" +
    "            <un-contact-group-selected></un-contact-group-selected>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
