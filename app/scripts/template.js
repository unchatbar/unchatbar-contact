angular.module('unchatbar-contact').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/unchatbar-contact/client/count.html',
    "<div class=\"un-contact-client-count {{additionClass}}\">{{userCount}}</div>"
  );


  $templateCache.put('views/unchatbar-contact/client/list.html',
    "<div class=\"list-group un-contact-client-list\">\n" +
    "    <a class=\"list-group-item\" ui-sref='contact.client({clientId: clientItem.id})'\n" +
    "       ng-repeat=\"clientItem in clientList | filter:clientFilter \">\n" +
    "        <span class=\"media-left\">\n" +
    "            <img class=\"img-circle img-xs\" data-ng-src=\"{{clientItem.image}} alt=\"Profile Picture\">\n" +
    "          </span>\n" +
    "        <div class=\"media-body\">\n" +
    "            <div class=\"text-lg\">{{clientItem.id}}</div>\n" +
    "            <span class=\"text-muted\">{{clientItem.description}}</span>\n" +
    "        </div>\n" +
    "    </a>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-contact/client/selected.html',
    "<div class=\"un-contact-client-selected\" data-ng-show=\"client.id\">\n" +
    "    <img class=\"client-image profile-image\" data-ng-src=\"{{client.image}}\"/>\n" +
    "    <div class=\"client-name\">{{client.label}}</div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-contact/group/add.html',
    "<form ng-submit=\"createGroup()\">\n" +
    "    <div class=\"input-group\">\n" +
    "        <input type=\"text\" class=\"form-control\" data-ng-model=\"newGroupName\"\n" +
    "               placeholder=\"Groupname\">\n" +
    "\n" +
    "        <div data-ng-click=\"createGroup();newGroupName='';\" class=\"input-group-addon\">\n" +
    "            <i class=\"fa fa-check fa-1x\"></i>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>"
  );


  $templateCache.put('views/unchatbar-contact/group/list.html',
    "<div class=\"list-group\">\n" +
    "    <div class=\"row list-group-item\"\n" +
    "         ng-repeat=\"(groupId,group) in groupMap\" ui-sref-active=\"active\">\n" +
    "        <div class=\"col-xs-8\">\n" +
    "            <a ui-sref='contact.group({groupId: groupId})'>\n" +
    "                <div class=\"pull-left\"><img class=\"profile-image\" data-ng-src=\"{{group.image}}\"/></div>\n" +
    "                <div class=\"pull-left list-contact\">\n" +
    "                    <br>\n" +
    "                    <span>{{group.label}}</span>\n" +
    "                </div>\n" +
    "                <div class=\"clearfix\"></div>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-4\">\n" +
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
    "        <div class=\"col-xs-5\">\n" +
    "            <img class=\"profile-image\" data-ng-src=\"{{group.image}}\"/>\n" +
    "            <small>{{group.label}}</small>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-7\">\n" +
    "            <span ng-if=\"group.editable === true\">\n" +
    "                  <span ng-dropdown-multiselect=\"\"\n" +
    "                        extra-settings=\"{showCheckAll:false,showUncheckAll : false}\"\n" +
    "                        events=\"{onItemSelect : addUserToGroup,onItemDeselect : removeUserFromGroup}\"\n" +
    "                        options=\"clientMap | filter:ownPeerId\"\n" +
    "                        translation-texts=\"{buttonDefaultText: group.label,dynamicButtonTextSuffix: 'users'}\"\n" +
    "                        selected-model=\"group.users\">\n" +
    "\n" +
    "                  </span>\n" +
    "            </span>\n" +
    "            <span ng-if=\"group.editable === false\">\n" +
    "                <div class=\"btn-group\" dropdown is-open=\"status.isopen\">\n" +
    "                    <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" dropdown-toggle ng-disabled=\"disabled\">\n" +
    "                        users <span class=\"caret\"></span>\n" +
    "                    </button>\n" +
    "                    <ul class=\"dropdown-menu\" role=\"menu\" >\n" +
    "                        <li data-ng-repeat=\"user in clientMap\">\n" +
    "                            <img class=\"profile-image\" data-ng-src=\"{{user.image}}\"/> {{user.label}}\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
