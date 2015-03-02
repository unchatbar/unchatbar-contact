angular.module('unchatbar-contact').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/unchatbar-contact/client/list.html',
    "<div class=\"list-group\">\n" +
    "    <div class=\"row list-group-item\"\n" +
    "         ng-repeat=\"(clientId,clientItem) in clientMap\" ui-sref-active=\"active\">\n" +
    "        <div class=\"col-xs-9\">\n" +
    "            <a ui-sref='contact.client({clientId: clientId})'>\n" +
    "                <div class=\"pull-left\"><img class=\"profile-image\" data-ng-src=\"{{clientItem.image}}\"/></div>\n" +
    "                <div class=\"pull-left list-contact\">\n" +
    "                    <span class=\"contact-online\" data-ng-show=\"clientOnlineMap[clientId]\">online</span>\n" +
    "                    <br>\n" +
    "                    <span>{{clientItem.label}}</span>\n" +
    "                </div>\n" +
    "                <div class=\"clearfix\"></div>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-3\">\n" +
    "            <div class=\"removeUser\">\n" +
    "                <i class=\" fa fa-trash fa-2x\" data-ng-click=\"removeClient(clientId)\"></i>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/unchatbar-contact/client/selected.html',
    "<div data-ng-show=\"client.id\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <img class=\"profile-image\" data-ng-src=\"{{client.image}}\"/>\n" +
    "            <small>{{client.label}}</small>\n" +
    "        </div>\n" +
    "    </div>\n" +
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
    "<div class=\"list-group\">\n" +
    "    <div class=\"row list-group-item\"\n" +
    "         ng-repeat=\"(groupId,group) in groupMap\" ui-sref-active=\"active\">\n" +
    "        <div class=\"col-xs-9\">\n" +
    "            <a ui-sref='contact.group({groupId: groupId})'>\n" +
    "                <div class=\"pull-left\"><img class=\"profile-image\" data-ng-src=\"{{group.image}}\"/></div>\n" +
    "                <div class=\"pull-left list-contact\">\n" +
    "                    <br>\n" +
    "                    <span>{{group.label}}</span>\n" +
    "                </div>\n" +
    "                <div class=\"clearfix\"></div>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-3\">\n" +
    "            <div class=\"removeUser\">\n" +
    "                <i class=\" fa fa-trash fa-2x\" data-ng-click=\"removeGroup(groupId)\"></i>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/unchatbar-contact/group/selected.html',
    "<div data-ng-show=\"group\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-7\">\n" +
    "            <img class=\"profile-image\" data-ng-src=\"{{group.image}}\"/>\n" +
    "            <small>{{group.label}}</small>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-5\">\n" +
    "            <span ng-if=\"group.editable === true\">\n" +
    "                  <span ng-dropdown-multiselect=\"\"\n" +
    "                        extra-settings=\"{showCheckAll:false,showUncheckAll : false}\"\n" +
    "                        events=\"{onItemSelect : addUserToGroup,onItemDeselect : removeUserFromGroup}\"\n" +
    "                        options=\"clientMap | filter:ownPeerId\"\n" +
    "                        translation-texts=\"{buttonDefaultText: group.label,dynamicButtonTextSuffix: 'users'}\"\n" +
    "                        selected-model=\"group.users\">\n" +
    "\n" +
    "                  </span>\n" +
    "                </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
