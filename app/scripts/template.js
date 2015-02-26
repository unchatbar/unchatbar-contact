angular.module('unchatbar-contact').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/unchatbar-contact/client/list.html',
    "<div class=\"list-group\">\n" +
    "    <a ui-sref='contact.client({clientId: clientId})' class=\"list-group-item\"\n" +
    "       ng-repeat=\"(clientId,clientItem) in clientMap\" ui-sref-active=\"active\">\n" +
    "    <img class=\"profile-image\" data-ng-src=\"{{clientItem.image}}\" data-ng-show=\"profile.image\"/>\n" +
    "        {{clientItem.label}}\n" +
    "        <span data-ng-show=\"clientOnlineMap[clientId]\">\n" +
    "            online\n" +
    "        </span>\n" +
    "    </a>\n" +
    "</div>\n"
  );


  $templateCache.put('views/unchatbar-contact/client/selected.html',
    "<div data-ng-show=\"client.id\">\n" +
    "    <span>\n" +
    "        <img class=\"profile-image\" data-ng-src=\"{{client.image}}\" data-ng-show=\"client.image\"/>\n" +
    "        <b>{{client.label}}</b><br>\n" +
    "    </span>\n" +
    "    <span>\n" +
    "        <i class=\" fa fa-trash fa-2x\" data-ng-click=\"removeClient(client.id)\"></i>\n" +
    "    </span>\n" +
    "</div>\n"
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
    "    <div ng-repeat=\"(groupId,group) in groupMap\">\n" +
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
    "<div data-ng-show=\"group\">\n" +
    "    <p>{{group.label}}</p>\n" +
    "    <span class=\"btn btn-success call\" data-ng-click=\"removeGroup(group.id)\">\n" +
    "        <i class=\" fa fa-trash fa-3x\"></i>\n" +
    "    </span>\n" +
    "    <span ng-if=\"group.editable === true\">\n" +
    "      <span ng-dropdown-multiselect=\"\"\n" +
    "            extra-settings=\"{showCheckAll:false,showUncheckAll : false}\"\n" +
    "            events=\"{onItemSelect : addUserToGroup,onItemDeselect : removeUserFromGroup}\"\n" +
    "            options=\"clientMap | filter:ownPeerId\"\n" +
    "            translation-texts=\"{buttonDefaultText: group.label,dynamicButtonTextSuffix: 'users'}\"\n" +
    "            selected-model=\"group.users\"></span>\n" +
    "    </span>\n" +
    "\n" +
    "</div>\n"
  );

}]);
