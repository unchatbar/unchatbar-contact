angular.module('unchatbar-contact').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/unchatbar-contact/client/admin.html',
    "<div class=\"un-contact-client-admin\" data-ng-show=\"client.id\">\n" +
    "    <button type=\"button\"\n" +
    "            data-ng-click=\"createGroup()\"><i class=\"icon-remove\"></i></button>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-contact/client/count.html',
    "<div class=\"un-contact-client-count {{additionClass}}\">{{userCount}}</div>"
  );


  $templateCache.put('views/unchatbar-contact/client/list.html',
    "<div class=\"un-contact-client-list\">\n" +
    "    <a ui-sref='contact.client({clientId: clientItem.id})'\n" +
    "       ng-repeat=\"clientItem in clientList | filter:clientFilter \">\n" +
    "        <span class=\"profile-image-box\">\n" +
    "            <img class=\"profile-image\" data-ng-src=\"{{clientItem.image}}\" alt=\"Profile Picture\">\n" +
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
    "<div class=\"un-contact-dialer\" >\n" +
    "    <form ng-submit=\"createGroup()\" class=\"form-group\">\n" +
    "        <label for=\"input-add\" class=\"sr-only\" translate>Add group</label>\n" +
    "        <div class=\"input-group\">\n" +
    "            <input type=\"text\" data-ng-model=\"newGroupName\" autocomplete=\"off\"\n" +
    "                   placeholder=\"{{'Enter groupname name'|translate}}\" required=\"true\" id=\"input-add\"\n" +
    "                   class=\"\" required=\"true\">\n" +
    "            <span class=\"input-group-btn\">\n" +
    "              <button class=\"un-connect-button-login\" type=\"button\"\n" +
    "                      data-ng-click=\"createGroup()\">\n" +
    "                  <i class=\"icon-add\"></i>\n" +
    "              </button>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-contact/group/count.html',
    "<div class=\"un-contact-group-count {{additionClass}}\">{{groupList.length}}</div>"
  );


  $templateCache.put('views/unchatbar-contact/group/list.html',
    "<div class=\"list-group un-contact-group-list\">\n" +
    "    <a class=\"list-group-item\" ui-sref='contact.group({groupId: group.id})'\n" +
    "       ng-repeat=\"group in groupList\">\n" +
    "        <span class=\"profile-image-box\">\n" +
    "            <img class=\"profile-image\" data-ng-src=\"{{group.image}}\" alt=\"Profile Picture\">\n" +
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
