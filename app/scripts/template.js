angular.module('unchatbar-contact').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/unchatbar-contact/client/list.html',
    "<div class=\"list-group\">\n" +
    "    <a ui-sref='contact.client({clientId: clientId})' class=\"list-group-item\"\n" +
    "       ng-repeat=\"(clientId,clientItem) in clientMap\" ui-sref-active=\"active\">\n" +
    "        <span ><img class=\"profile-image\" data-ng-src=\"{{clientItem.image}}\" /></span>\n" +
    "        <span >\n" +
    "            <span class=\"contact-online\" data-ng-show=\"clientOnlineMap[clientId]\">online</span>\n" +
    "            <br>\n" +
    "            <span>{{clientItem.label}}</span>\n" +
    "        </span>\n" +
    "\n" +
    "\n" +
    "    </a>\n" +
    "</div>\n"
  );


  $templateCache.put('views/unchatbar-contact/client/selected.html',
    "<div data-ng-show=\"client.id\">\n" +
    "    <span>\n" +
    "        <img class=\"profile-image\" data-ng-src=\"{{client.image}}\" />\n" +
    "        <br />\n" +
    "        <b>{{client.label}}</b> <i class=\" fa fa-trash fa-2x\" data-ng-click=\"removeClient(client.id)\"></i>\n" +
    "    </span>\n" +
    "    <span>\n" +
    "\n" +
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
    "<div class=\"list-group\">\n" +
    "    <a ui-sref-active=\"active\" ui-sref='contact.group({groupId: groupId})' class=\"list-group-item\"\n" +
    "       ng-repeat=\"(groupId,group) in groupMap\" ui-sref-active=\"active\">\n" +
    "        <img class=\"profile-image\" data-ng-src=\"{{group.image}}\"/>\n" +
    "        {{group.label}}\n" +
    "    </a>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('views/unchatbar-contact/group/selected.html',
    "<div data-ng-show=\"group\">\n" +
    "     <span>\n" +
    "        <img class=\"profile-image\" data-ng-src=\"{{group.image}}\" />\n" +
    "        <br />\n" +
    "        <b>{{group.label}}</b> <i class=\" fa fa-trash fa-2x\" data-ng-click=\"removeGroup(group.id)\"></i>\n" +
    "    </span>\n" +
    "\n" +
    "    <span ng-if=\"group.editable === true\">\n" +
    "        <br />\n" +
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
