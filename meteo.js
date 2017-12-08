$longitude=48.8534,
$latitude=2.3488,


$("#Meteo").unbind().click(function(longitude,latitude){

    $.ajax({
	url : 'http://www.infoclimat.fr/public-api/gfs/json?_ll='+$latitude+','+$longitude+'&_auth=UUsFElQqUHJQfVZhUiRSewBoUGVZL1B3VCgBYg9qAn8Eb1MyVTVQNgJsUSwBLlBmVHlTMA41CTkBagtzDX8DYlE7BWlUP1A3UD9WM1J9UnkALlAxWXlQd1Q2AWUPZgJ%2FBGVTNlUyUCwCb1E2ATVQelRmUzcONgkuAX0LbQ1lA2FRMAVnVDBQM1A3VjZSZ1J5ACxQNVk3UGpUPgFuDzMCZARmUz9VNlA6AjtRNwEzUHpUb1MxDjEJMgFlC28NYQNjUS0FflROUEFQIlZ0UiBSMwB1UC1ZM1A2VGM%3D&_c=da1f3459282872cfd35015afdee63be7',
	type : 'GET',
	dataType : 'json',
	success : function(meteoJson, statut){
            console.log(meteoJson)
	}
    });
    
});

