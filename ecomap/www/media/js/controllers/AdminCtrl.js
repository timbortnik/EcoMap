app.factory('msg', function (toaster) {
    return msg = {
        editSuccess: function(msg){
            toaster.pop('success', 'Редагування', 'Редагування ' + msg + ' здійснено успішно!');
        },
        deleteSuccess: function(msg){
            toaster.pop('success', 'Видалення', 'Видалення ' + msg + ' здійснено успішно!');
        },
        createSuccess: function(msg){
            toaster.pop('success', 'Додавання', 'Додавання ' + msg + ' здійснено успішно!');
        },
        editError: function(msg){
            toaster.pop('error', 'Редагування', 'При редагуванні ' + msg + ' виникла помилка!');
        },
        deleteError: function(msg){
            toaster.pop('error', 'Видалення', 'При видаленні ' + msg + ' виникла помилка!');
        },
        createError: function(msg){
            toaster.pop('error', 'Додавання', 'При додаванні ' + msg + ' виникла помилка!');
        },
    };
    });

app.controller("ResourceCtrl",['$scope','$http', 'toaster','msg', function($scope,$http, toaster,msg){
    $scope.msg=msg
    $scope.addResModal = false;
    $scope.triggerAddResModal = function(){
        $scope.addResModal = true;
        $scope.newResource = {};
    };





    $scope.editResModal = false;

    $scope.showeditResModal = function(name,id){
        $scope.editResObj={
            'name':name,
            'id':id
        };
        $scope.editResModal = true;
    }


    $scope.editResource = function(editResObj){
        if(!editResObj.name || !editResObj.id){
            return;
        }

        $http({
        method:"PUT",
        url:"/api/resources",
        data:{
          "resource_name": editResObj['name'],
          "resource_id" :  editResObj['id']
        }
        }).then(function successCallback(data) {
            $scope.loadRes()
            $scope.editResModal = false;
            $scope.msg.editSuccess('ресурсу');
        }, function errorCallback(response) {
            $scope.msg.editError('ресурсу');
        })

    };


    $scope.deleteResource = function(id){
        $http({
          method:"DELETE",
          headers: {"Content-Type": "application/json;charset=utf-8"},
          url:"/api/resources",
          data:{
            "resource_id":id
          }
        }).then(function successCallback(data) {
            //if accepted data has attribute  'deleted_resource',delete prop
            $scope.loadRes()
            $scope.msg.deleteSuccess('ресурсу');
        }, function errorCallback(response) {
            $scope.msg.deleteError('ресурсу');
        })
    };

    $scope.newResource = {};

    $scope.addResource = function(newResource){
        console.log($scope.Roles)
        if(!newResource.name){
            return;
        }

         $http({
            method: "POST",
            url: "/api/resources",
            data:{
                'resource_name': $scope.newResource.name
            }
        }).then(function successCallback(data) {
        $scope.addResModal = false;
        $scope.Resources[data.data.added_resource]=data.data.resource_id
        $scope.addResModal=false
        $scope.msg.createSuccess('ресурсу');
        }, function errorCallback(response) {
            $scope.addResModal=false
            $scope.msg.createError('ресурсу');
        });

    };
}])
app.controller("PermisionCtrl",['$scope','$http', 'toaster', function($scope,$http, toaster){
    $scope.addPermModal = false;

    $scope.showAddPermModal = function(){
         console.log("cli")
        $scope.addPermModal = true;
        $scope.perm = {};
    };
    $scope.show=function(){
       var name= $scope.perm.resource_name
    }
 
    $scope.addPermSubmit = function(){
        var id= $scope.Resources[$scope.perm.resource_name]

        $http({
            method:"POST",
            headers: {"Content-Type": "application/json;"},
            url:"/api/permissions",
            data:{
            "resource_id":id,
            "action":$scope.perm['action'],
            "modifier":$scope.perm['modifier'],
            "description":$scope.perm['description']
            } 
        }).then(function successCallback(data) {
            $scope.loadPerm()
            $scope.addPermModal = false;
            $scope.msg.createSuccess('права');
        }, function errorCallback(response) {
            $scope.msg.createError('права');

        });
    };

    $scope.editPermModal = false;
    $scope.showEditPermModal = function(perm){
        $scope.editPerm=perm
        $scope.editPermModal = true;
    }
    // function for editing permisions 
    
    $scope.editPermSubmit = function(id){
         $http({
            method:"PUT",
            url:"/api/permissions",
            data:{
                "permission_id":$scope.editPerm.permission_id,
                "action":$scope.editPerm['action'],
                "modifier":$scope.editPerm.modifier, 
                "description":$scope.editPerm['description']
            }
        }).then(function successCallback(data) {
                console.log(data)
                $scope.editPermModal = false;
                $scope.msg.editSuccess('права');
                $scope.loadPerm()

            }, function errorCallback(response) {
                $scope.msg.editError('права');
            })
    };
    $scope.deletePerm=function(perm){
        $http({
            'method':"DELETE",
            'headers': {"Content-Type": "application/json;charset=utf-8"},
            'url':"/api/permissions",
            "data":{
                "permission_id":perm.permission_id
            }
            }).then(function successCallback(data) {
            if(!data.data.error){
                $scope.loadPerm()
                $scope.msg.deleteSuccess('права');
                }
            else{
                $scope.msg.deleteError('права');
            }
            }, function errorCallback(response) {
                 $scope.msg.deleteError('права');
            })
    }
}])
app.controller("RoleCtrl",['$scope','$http', 'toaster', function($scope,$http, toaster){
    $scope.addRoleModal = false;
    $scope.showAddRoleModal = function(){
        $scope.addRoleModal = true;
        $scope.role = {};
    }

    $scope.addRoleSubmit = function(){
        $http({
                method:"POST",
                url:"/api/roles",
                data:{
                    "role_name":$scope.role['name']
                }
            }).then(function successCallback(data) {
                $scope.msg.createSuccess('ролі');
                $scope.Roles[data.data.added_role]=data.data.added_role_id;
                $scope.addRoleModal = false;
            }, function errorCallback(response) {
                $scope.msg.createError('ролі');
            })
    };

    $scope.deleteRole=function(id){
        $http({
            method:"DELETE",
            headers: {"Content-Type": "application/json;charset=utf-8"},
            url:"/api/roles",
            data:{
                "role_id":id
            }
            }).then(function successCallback(data) {
            for(r in $scope.Roles){
                if($scope.Roles[r] == data.data['deleted_role']){
                    delete $scope.Roles[r]
                    $scope.msg.deleteSuccess('ролі');
                }
            }
            if(data.data.error){
            $scope.msg.deleteError('ролі');
            }
            },function errorCallback(response) {
            $scope.msg.deleteError('ролі');
            })
            }

    $scope.editRoleObj={};

    $scope.editRole=function(){
        $http({
                method:"PUT",
                url:"/api/roles",
                data:{
                "role_name":$scope.editRoleObj['name'],
                "role_id" : $scope.editRoleObj['id']
                }
            }).then(function successCallback(data) {
            $scope.loadRole()
            $scope.msg.editSuccess('ролі');
            $scope.editRoleModal=false
            },function errorCallback(response) {
            $scope.msg.editError('ролі');
            })
            }
    $scope.editRoleModal=false
    $scope.showEditRoleModal=function(name,id){
        $scope.editRoleObj = {
            'name':name,
            "id":id
        }
        $scope.editRoleModal=true
        $scope.listToSend=[]
    }

    $scope.rolePerm=false
    $scope.selectPerm=function(ev,perm){        
        if($scope.listToSend.indexOf(perm.permission_id)===-1){
            $scope.listToSend.push(perm.permission_id)
        }
        else{
            $scope.listToSend.splice( $scope.listToSend.indexOf(perm.permission_id), 1 )
        }        
    }
    $scope.isChecked=function(perm){
       if($scope.listToSend){
         if($scope.listToSend.indexOf(perm.permission_id) !== -1){
                return true
            }
        }
    }

    $scope.backToRole=function(){
        $scope.rolePermTable = true
        $scope.rolePermBlock = false
    }

    $scope.rolePermTable = true
    $scope.rolePermBlock = false
    $scope.showRolePerm=function(name,id){
        $scope.rolePermTable = false
        $scope.rolePermBlock = true
        $scope.rolePermObj={
            "name":name,
            "id":id
        }

        $scope.selectPermObj={}
        $scope.listToSend=[]

        $http({
            method:"GET",
            url:"/api/role_permissions",
            params:{

                role_id:$scope.rolePermObj.id
            }
        }).then(function successCallback(data) {
                $scope.actualPermInRole = data.data.actual
                console.log($scope.actualPermInRole)
                for(var i=0;i < $scope.actualPermInRole.length;i++){
                if($scope.listToSend.indexOf($scope.actualPermInRole[i].id) === -1){
                $scope.listToSend.push($scope.actualPermInRole[i].permission_id)
                $scope.selectPermObj[$scope.actualPermInRole[i]['permission_id']] =
                $scope.actualPermInRole[i]
                }
                }
                $scope.checkInActual=function(id){
                    var actualPermList=[]
                         $scope.actualPermInRole.forEach(function(elem){
                            actualPermList.push(elem.permission_id)     
                         })
                         if(actualPermList.indexOf(id) == -1){
                            return true
                         }
                         else{
                            return false
                         }
                        
                    }
                }, function errorCallback(response) {
                    $scope.msg.deleteError('ролі');
                })


    }



    $scope.deletePermFormRole=function(perm){
            $scope.actualPermInRole.forEach(function(actual_perm,index){
                if(actual_perm.permission_id === perm.permission_id){
                    $scope.actualPermInRole.splice( index, 1 )
                    $scope.listToSend.splice( $scope.listToSend.indexOf(perm.permission_id), 1 )
                }
            })               
    }
    $scope.searchWord=""
    $scope.searchWordActual=""
    $scope.bindResPerm=function(){
         $http({
            method:"PUT",
            url:"/api/role_permissions",
            data:{
                "role_id":$scope.rolePermObj.id, 
                "permission_id":$scope.listToSend
            }
            }).then(function successCallback(data) {
                $scope.msg.editSuccess('прав');
                $scope.rolePermTable = true
                $scope.rolePermBlock = false
            }, function errorCallback(response) {
                $scope.msg.editError('прав');
            })


        
    }

}])
app.controller("UserCtrl",['$scope','$http', 'toaster', function($scope,$http, toaster){
    $scope.name="vlad"

}])
app.controller('AdminCtrl', ['$scope','$http', 'toaster', function($scope,$http, toaster){

    $scope.meth_obj={
        "1":"GET",
        "2":"PUT",
        "3":"POST",
        "4":'DELETE'
    }
    $scope.modif_obj={
        '1':'None',
        '2':'Own',
        "3":"Any"
    }
    
    $scope.selectCountObj={
        "1":'5',
        "2":"10",
        "3":"15",
        "4":"20"
    }
    $scope.selectCount={
        'selected':"5"
    }
    

    $scope.loadRes=function(){
        $http({
            method: 'GET',
            url: '/api/resources'
        }).then(function successCallback(data) {
            $scope.Resources = data.data

        }, function errorCallback(response) {
            //console.log(response)
        });
    }
    $scope.loadPerm=function(){
        $http({
                method: "GET",
                url: '/api/all_permissions',
               
            }).then(function successCallback(data) {
                $scope.Permisions=data.data;
                //console.log($scope.Permisions)
                
            }, function errorCallback(response) {
                //console.log(response)
            })

    }
    $scope.loadRole=function(){
         $http({
                method:"GET",
                url:"/api/roles",

            }).then(function successCallback(data) {
                $scope.Roles=data.data
                console.log("Roles")
                console.log($scope.Roles)
            },function errorCallback(response) {
                //console.log(response)
            })

    }

    $scope.loadData=function(){
        $scope.loadRole()
        //load resources
        $http({
            method: 'GET',
            url: '/api/resources'
        }).then(function successCallback(data) {
            $scope.Resources = data.data

        }, function errorCallback(response) {
            //console.log(response)
        });

        //load permisions
         $http({
                method: "GET",
                url: '/api/all_permissions',
               
            }).then(function successCallback(data) {
                $scope.Permisions=data.data;
                //console.log($scope.Permisions)
                
            }, function errorCallback(response) {
                //console.log(response)
            })

        // load roles

        $http({
                method:"GET",
                url:"/api/roles",

            }).then(function successCallback(data) {
                $scope.Roles=data.data
                //console.log($scope.Roles)
            },function errorCallback(response) {
                //console.log(response)
            })

        $http({
            method:'GET',
            url:"/api/user_roles"
        }).then(function successCallback(data) {
                //$scope.Roles=data.
                $scope.Users=data.data
                console.log(data)
                //console.log("user_roles")

            },function errorCallback(response) {
                //console.log(response)
            })

    }

    $scope.loadData()


    //Users
    $scope.changeRole=function(user_obj){
        console.log(user_obj)
        var role_id;
        for (role in $scope.Roles){
            if(user_obj.role_name === role){
                role_id = $scope.Roles[user_obj.role_name]
            }
        }
        $http({
            method:"POST",
            url:"/api/user_roles",
            data:{
                "role_id":role_id,
                "user_id":user_obj.id
            }
        }).then(function successCallback(data) {
                $scope.msg.editSuccess('користувача');
            }, function errorCallback(response) {
                //$scope.Eror=response
                //$scope.customEror=true
                $scope.msg.editError('користувача');
            })
    }
   // Pagination
   $scope.loadPagination=function(){
    console.log("load")

  $scope.fromPage = 1;
  $scope.bigCurrentPage = 1;
  $scope.UsersLength = $scope.selectCount['selected'];

  $scope.bigTotalItems =300// $scope.UsersLength / $scope.selectCount['selected']*10;
  if($scope.bigCurrentPage === 1){
    $http({
        method:"GET",
        url:"/api/user_page",
        params:{
            per_page:$scope.selectCount['selected'],
            offset:0,
        }
        }).then(function successCallback(data) {
            var UsersObj = data.data
            var UsersLength = data.data.pop();
            $scope.UsersLength = UsersLength;
            $scope.selectedUsers = UsersObj;
            console.log($scope.bigTotalItems)
            }, function errorCallback(response) {
                //$scope.Eror=response
                //$scope.customEror=true
                $scope.msg.editError('користувача');
    })
  }


  $scope.$watch('bigCurrentPage', function(newValue, oldValue) {

    $scope.bigTotalItems = 300 //$scope.UsersLength / $scope.selectCount['selected']*10;
     console.log($scope.bigTotalItems)
    var stepCount =$scope.selectCount['selected']
    console.log("new :"+$scope.selectCount['selected']*newValue)
    console.log($scope.selectCount['selected']*newValue - stepCount)
        $http({
        method:"GET",
        url:"/api/user_page",
        params:{
            per_page:$scope.selectCount['selected'],
            offset:$scope.selectCount['selected']*newValue -stepCount,
        }
        }).then(function successCallback(data) {
            $scope.selectedUsers = data.data
               var UsersObj = data.data
                var UsersLength = data.data.pop();
                $scope.UsersLength = UsersLength;

            }, function errorCallback(response) {
                //$scope.Eror=response
                //$scope.customEror=true
                $scope.msg.editError('користувача');
    })
    });
   $scope.change=function(currPage){
        $scope.bigCurrentPage = currPage


    }

  $scope.maxSize = 6;

  console.log($scope.bigTotalItems)
   }


}]);