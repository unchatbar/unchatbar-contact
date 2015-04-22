angular.module('unchatbar-contact').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/unchatbar-contact/client/admin.html',
    "<div class=\"un-contact-client-admin\" data-ng-show=\"client.id\">\n" +
    "    <div class=\"remove\"\n" +
    "            data-ng-click=\"removeClient(client.id)\"><span translate>remove</span>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-contact/client/count.html',
    "<div class=\"un-contact-client-count {{additionClass}}\">{{userCount}}</div>"
  );


  $templateCache.put('views/unchatbar-contact/client/list.html',
    "<div class=\"un-contact-client-list\">\n" +
    "    <a ng-repeat=\"clientItem in clientList | filter:clientFilter \"\n" +
    "       ui-sref='channel({channel: clientItem.channel})'\n" +
    "       >\n" +
    "        <span class=\"profile-image-box\">\n" +
    "            <img class=\"profile-image\" data-ng-src=\"{{clientItem.image}}\" alt=\"{{'Profile Picture' | translate}}\">\n" +
    "        </span>\n" +
    "        <div class=\"profile-info-box\">\n" +
    "            <div class=\"text-lg\">{{clientItem.id}}</div>\n" +
    "            <span class=\"text-muted\">{{clientItem.description}}</span>\n" +
    "        </div>\n" +
    "    </a>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-contact/client/selected.html',
    "<div class=\"un-contact-client-selected\" data-ng-show=\"client.id\">\n" +
    "    <span class=\"profile-image-box\">\n" +
    "        <img class=\"profile-image\" data-ng-src=\"{{client.image}}\"/>\n" +
    "    </span>\n" +
    "\n" +
    "    <div class=\"profile-info-box\">\n" +
    "        <div class=\"client-name\">{{client.label}}</div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-contact/group/add.html',
    "<div class=\"un-contact-group-add\" >\n" +
    "    <form data-ng-submit=\"createGroup()\" >\n" +
    "        <label for=\"input-add\" translate>Add group</label>\n" +
    "        <div class=\"dialer-group\">\n" +
    "            <input type=\"text\" data-ng-model=\"newGroupName\" autocomplete=\"off\"\n" +
    "                   placeholder=\"{{'Enter groupname name'|translate}}\" required=\"true\" id=\"input-add\"\n" +
    "                    required=\"true\">\n" +
    "            <span class=\"button-group\">\n" +
    "              <button type=\"button\" data-ng-disabled=\"!newGroupName\"\n" +
    "                      data-ng-click=\"createGroup()\">\n" +
    "                  <i ></i>\n" +
    "              </button>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-contact/group/admin.html',
    "<div role=\"menu\" class=\"un-contact-group-admin\" data-ng-show=\"group.id\">\n" +
    "    <form name=\"adminFormGroup\">\n" +
    "        <div class=\"image-group\">\n" +
    "            <div>\n" +
    "                <input type=\"hidden\" data-ng-model=\"newImage\">\n" +
    "                <input class=\"fileUpload\" accept=\"image/*\" type=\"file\"\n" +
    "                       data-ng-click=\"adminFormGroup.$dirty  = true;\" file-model=\"newImage\"/>\n" +
    "                <img class=\"img-circle img-user\" ng-src=\"{{group.image}}\"/>\n" +
    "            </div>\n" +
    "            <div class=\"cropArea\" data-ng-if=\"newImage\">\n" +
    "                <img-crop result-image-size=\"80\" result-image-format=\"image/jpeg\" image=\"newImage\"\n" +
    "                          result-image=\"group.image\"></img-crop>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"name-group\">\n" +
    "            <label for=\"display-name\" translate>group name</label>\n" +
    "            <input type=\"text\" placeholder=\"{{'Enter groupname name' | translate}}\" id=\"display-name\"\n" +
    "                   data-ng-model=\"group.label\" required=\"true\">\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"description-group\">\n" +
    "            <label for=\"user-description\" translate>short description</label>\n" +
    "            <input type=\"text\" data-ng-model=\"group.description\"\n" +
    "                   placeholder=\"{{'a short description' | translate}}\"\n" +
    "                   id=\"user-description\">\n" +
    "        </div>\n" +
    "        <div class=\"user-group\" data-ng-if=\"group.users\">\n" +
    "            <label for=\"user-description\" translate>users in group</label>\n" +
    "\n" +
    "            <p>\n" +
    "                   <span ng-dropdown-multiselect=\"\"\n" +
    "                         extra-settings=\"{showCheckAll:false,showUncheckAll : false}\"\n" +
    "                         events=\"{onItemSelect : setFormDirty, onItemDeselect: setFormDirty}\"\n" +
    "                         options=\"clientMap | filter:ownPeerId\"\n" +
    "                         translation-texts=\"{buttonDefaultText: group.label,dynamicButtonTextSuffix: 'users'}\"\n" +
    "                         selected-model=\"group.users\">\n" +
    "                   </span>\n" +
    "            </p>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "    <div class=\"divider mar-no\"></div>\n" +
    "    <div class=\"menu-footer\">\n" +
    "        <div class=\"removeUser\" data-ng-click=\"removeGroup(group.id)\">\n" +
    "            <span translate>remove</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"save\" data-ng-disabled=\"!group.editable\"\n" +
    "             data-ng-class=\"{'disabled' : !group.editable, 'allowed' :group.editable ,'data-change' : adminFormGroup.$dirty && group.editable}\"\n" +
    "             data-ng-click=\"update();adminFormGroup.$setPristine();newImage='';\">\n" +
    "            <span translate>Update</span>\n" +
    "\n" +
    "            <div data-ng-hide=\"group.editable\" class=\"access-info\" translate>\n" +
    "                only group admin can update a group\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('views/unchatbar-contact/group/count.html',
    "<div class=\"un-contact-group-count {{additionClass}}\">{{groupList.length}}</div>"
  );


  $templateCache.put('views/unchatbar-contact/group/list.html',
    "<div class=\"list-group un-contact-group-list\">\n" +
    "    <a class=\"list-group-item\" ui-sref='channel({channel: group.id})'\n" +
    "       ng-repeat=\"group in groupList\">\n" +
    "        <span class=\"profile-image-box\">\n" +
    "            <img class=\"profile-image\" data-ng-src=\"{{group.image}}\" alt=\"{{'Profile Picture' | translate}}\">\n" +
    "          </span>\n" +
    "        <div class=\"profile-info-box\">\n" +
    "            <div class=\"text-lg\">{{group.label}}</div>\n" +
    "            <span class=\"text-muted\">{{group.description}}</span>\n" +
    "        </div>\n" +
    "    </a>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-contact/group/selected.html',
    "<div class=\"un-contact-group-selected\" data-ng-show=\"group\">\n" +
    "    <span class=\"profile-image-box\">\n" +
    "        <img class=\"profile-image\" data-ng-src=\"{{group.image}}\"/>\n" +
    "    </span>\n" +
    "\n" +
    "    <div class=\"profile-info-box\">\n" +
    "        <div class=\"group-name\">{{group.label}}</div>\n" +
    "    </div>\n" +
    "</div>\n"
  );

}]);
