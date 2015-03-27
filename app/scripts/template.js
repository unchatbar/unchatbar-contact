angular.module('unchatbar-contact').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/unchatbar-contact/client/admin.html',
    "<div class=un-contact-client-admin data-ng-show=client.id><div class=remove data-ng-click=removeClient(client.id)><span translate>remove</span></div></div>"
  );


  $templateCache.put('views/unchatbar-contact/client/count.html',
    "<div class=\"un-contact-client-count {{additionClass}}\">{{userCount}}</div>"
  );


  $templateCache.put('views/unchatbar-contact/client/list.html',
    "<div class=un-contact-client-list><a ui-sref=\"contact.channel({channel: clientItem.channel})\" ng-repeat=\"clientItem in clientList | filter:clientFilter \"><span class=profile-image-box><img class=profile-image data-ng-src={{clientItem.image}} alt=\"{{'Profile Picture' | translate}}\"></span><div class=profile-info-box><div class=text-lg>{{clientItem.id}}</div><span class=text-muted>{{clientItem.description}}</span></div></a></div>"
  );


  $templateCache.put('views/unchatbar-contact/client/selected.html',
    "<div class=un-contact-client-selected data-ng-show=client.id><span class=profile-image-box><img class=profile-image data-ng-src=\"{{client.image}}\"></span><div class=profile-info-box><div class=client-name>{{client.label}}</div></div></div>"
  );


  $templateCache.put('views/unchatbar-contact/group/add.html',
    "<div class=un-contact-dialer><form ng-submit=createGroup() class=form-group><label for=input-add class=sr-only translate>Add group</label><div class=input-group><input data-ng-model=newGroupName autocomplete=off placeholder=\"{{'Enter groupname name'|translate}}\" required id=input-add required> <span class=input-group-btn><button class=un-connect-button-login type=button data-ng-click=createGroup()><i class=icon-add></i></button></span></div></form></div>"
  );


  $templateCache.put('views/unchatbar-contact/group/admin.html',
    "<div role=menu class=un-contact-group-admin data-ng-show=group.id><div class=menu-header><span translate>admin group</span></div><div class=\"divider mar-no\"></div><div class=menu-content><form name=adminFormGroup><div class=image-group><div><input type=hidden data-ng-model=newImage> <input class=fileUpload accept=image/* type=file data-ng-click=\"adminFormGroup.$dirty  = true;\" file-model=\"newImage\"> <img class=\"img-circle img-user\" ng-src=\"{{group.image}}\"></div><div class=cropArea data-ng-if=newImage><img-crop result-image-size=80 result-image-format=image/jpeg image=newImage result-image=group.image></img-crop></div></div><div class=name-group><label for=display-name translate>group name</label><input placeholder=\"{{'Enter groupname name' | translate}}\" id=display-name data-ng-model=group.label required></div><div class=description-group><label for=user-description translate>short description</label><input data-ng-model=group.description placeholder=\"{{'a short description' | translate}}\" id=user-description></div><div class=user-group data-ng-if=group.users><label for=user-description translate>users in group</label><p><span ng-dropdown-multiselect=\"\" extra-settings=\"{showCheckAll:false,showUncheckAll : false}\" events=\"{onItemSelect : setFormDirty, onItemDeselect: setFormDirty}\" options=\"clientMap | filter:ownPeerId\" translation-texts=\"{buttonDefaultText: group.label,dynamicButtonTextSuffix: 'users'}\" selected-model=group.users></span></p></div></form></div><div class=\"divider mar-no\"></div><div class=menu-footer><div class=removeUser data-ng-click=removeGroup(group.id)><span translate>remove</span></div><div class=save data-ng-disabled=!group.editable data-ng-class=\"{'disabled' : !group.editable, 'allowed' :group.editable ,'data-change' : adminFormGroup.$dirty && group.editable}\" data-ng-click=\"update();adminFormGroup.$setPristine();newImage='';\"><span translate>Update</span><div data-ng-hide=group.editable class=access-info translate>only group admin can update a group</div></div></div></div>"
  );


  $templateCache.put('views/unchatbar-contact/group/count.html',
    "<div class=\"un-contact-group-count {{additionClass}}\">{{groupList.length}}</div>"
  );


  $templateCache.put('views/unchatbar-contact/group/list.html',
    "<div class=\"list-group un-contact-group-list\"><a class=list-group-item ui-sref=\"contact.channel({channel: group.id})\" ng-repeat=\"group in groupList\"><span class=profile-image-box><img class=profile-image data-ng-src={{group.image}} alt=\"{{'Profile Picture' | translate}}\"></span><div class=profile-info-box><div class=text-lg>{{group.label}}</div><span class=text-muted>{{group.description}}</span></div></a></div>"
  );


  $templateCache.put('views/unchatbar-contact/group/selected.html',
    "<div class=un-contact-group-selected data-ng-show=group><span class=profile-image-box><img class=profile-image data-ng-src=\"{{group.image}}\"></span><div class=profile-info-box><div class=group-name>{{group.label}}</div></div></div>"
  );

}]);
