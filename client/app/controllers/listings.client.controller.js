angular.module('listings').controller('ListingsController', ['$scope', '$location', '$stateParams', '$state', 'Listings', 
  function($scope, $location, $stateParams, $state, Listings){
    $scope.find = function() {
      /* set loader*/
      $scope.loading = true;

      /* Get all the listings, then bind it to the scope */
      Listings.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.listings = response.data;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve listings!\n' + error;
      });
    };

    $scope.findOne = function() {
      debugger;
      $scope.loading = true;

      /*
        Take a look at 'list-listings.client.view', and find the ui-sref attribute that switches the state to the view 
        for a single listing. Take note of how the state is switched: 

          ui-sref="listings.view({ listingId: listing._id })"

        Passing in a parameter to the state allows us to access specific properties in the controller.

        Now take a look at 'view-listing.client.view'. The view is initialized by calling "findOne()". 
        $stateParams holds all the parameters passed to the state, so we are able to access the id for the 
        specific listing we want to find in order to display it to the user. 
       */

      var id = $stateParams.listingId;

      console.log('listingId is: ' + $stateParams.listingId);

      Listings.read(id)
              .then(function(response) {
                $scope.listing = response.data;
                $scope.loading = false;
              }, function(error) {  
                $scope.error = 'Unable to retrieve listing with id "' + id + '"\n' + error;
                $scope.loading = false;
              });
    };  

    $scope.create = function(isValid) {
      $scope.error = null;

      /* 
        Check that the form is valid. (https://github.com/paulyoder/angular-bootstrap-show-errors)
       */
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      /* Create the listing object */
      var listing = {
        name: $scope.name, 
        code: $scope.code, 
        show:false,address: $scope.address
      };

      /* Save the article using the Listings factory */
      Listings.create(listing)
              .then(function(response) {
                //if the object is successfully saved redirect back to the list page
                $state.go('listings.list', { successMessage: 'Listing succesfully created!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save listing!\n' + error;
              });
    };

    $scope.update = function(isValid) {
      /*
        Fill in this function that should update a listing if the form is valid. Once the update has 
        successfully finished, navigate back to the 'listing.list' state using $state.go(). If an error 
        occurs, pass it to $scope.error. 
       */
       $scope.error = null;

       var listingId = $stateParams.listingId;

      console.log('update listingId is: ' + listingId);

      /* 
        Check that the form is valid. (https://github.com/paulyoder/angular-bootstrap-show-errors)
       */
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      /* Create the listing object */
      var listing = {
        name: $scope.name, 
        code: $scope.code, 
        show:false,address: $scope.address
      };

      /* Save the article using the Listings factory */
      Listings.update(listingId, listing)
              .then(function(response) {
                //if the object is successfully saved redirect back to the list page
                $state.go('listings.list', { successMessage: 'Listing succesfully saved!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save listing!\n' + error;
              });
    };

    $scope.remove = function(listingId) {
      /*
        Implement the remove function. If the removal is successful, navigate back to 'listing.list'. Otherwise, 
        display the error. 
       */
       Listings.delete(listingId)
          .then(function(response) {
                //if the object is successfully saved redirect back to the list page
                $state.go('listings.list', { successMessage: 'Listing succesfully deleted!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to delete listing!\n' + error;
              });
    };
	
    /* Bind the success message to the scope if it exists as part of the current state */
    if($stateParams.successMessage) {
      $scope.success = $stateParams.successMessage;
    }
     

    /* Map properties */
    $scope.map = {
      center: {
        latitude: 29.65163059999999,
        longitude: -82.3410518
      }, 
      zoom: 13
    }
	
	 
	$scope.createMarkers= function(){
	     $scope.markers= [
        {
            code: "AAF", 
            title: "Academic Advisement - Farrior Hall", 
            
                latitude: 29.6502323, 
                longitude: -82.34563860000002,
				id:1,
            
            show:false,address: "100 Fletcher Dr, Gainesville, FL 32611, United States"
        }, 
        {
            code: "AGRL", 
            title: "Plant Pathology Research Lab 2"
        }, 
        {
            code: "AND", 
            title: "Anderson Hall", 
            
                latitude: 29.6515682, 
                longitude: -82.3418895,
				id:2,
            
            show:false,address: "1507 W University Ave, Gainesville, FL 32611, United States"
        }, 
        {
            code: "ANS", 
            title: "Animal Sciences", 
            
                latitude: 29.6311971, 
                longitude: -82.351627,
				id:3,
            
            show:false,address: "Gainesville, FL 32608, United States"
        }, 
        
		
        {
            code: "ARB", 
            title: "Academic Research - Health Sciences Center", 
            
                latitude: 29.6399441, 
                longitude: -82.343777,
				id:4,
             
            show:false,address: "1600 SW Archer Rd, Gainesville, FL 32610, United States"
        }, 
        {
            code: "ARCH", 
            title: "Architecture", 
            
                latitude: 29.6477756, 
                longitude: -82.3403431,
				id:5,
             
            show:false,address: "1389 Stadium Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "ASF", 
            title: "Elmore Hall", 
            
                latitude: 29.6434801, 
                longitude: -82.3661789,
				id:6
            , 
            show:false,address: "Elmore Hall for Administrative Services, Gainesville, FL 32607, USA"
        }, 
        {
            code: "AUD", 
            title: "University Auditorium", 
            
                latitude: 29.6490269, 
                longitude: -82.3428428,
				id:7,
            
            show:false,address: "333 Newell Dr, Gainesville, FL 32611, United States"
        }, 

        {
            code: "BAR", 
            title: "Bartram Hall", 
            
                latitude: 29.6439198, 
                longitude: -82.34440939999999,
				id:8,
            
            show:false,address: "Bartram Hall, Gainesville, FL 32603, USA"
        }, 
        {
            code: "BEC", 
            title: "Beaty Commons", 
            
                latitude: 29.6441511, 
                longitude: -82.3404853,
				id:9,
            
            show:false,address: "Gainesville, FL 32603, United States"
        }, 
        {
            code: "BEN", 
            title: "Benton Hall", 
            
                latitude: 29.6436325, 
                longitude: -82.3549302,
				id:10,
            
            show:false,address: "Gainesville, FL 32611, United States"
        }, 
        {
            code: "BGH", 
            title: "Bruton-Geer Hall", 
            
                latitude: 29.6492321, 
                longitude: -82.3590286,
				id:11,
            
            show:false,address: "Bruton-Geer Hall, Gainesville, FL 32603, USA"
        }, 
        {
            code: "BLK", 
            title: "Black Hall - Environmental Science", 
            
                latitude: 29.6484088, 
                longitude: -82.3484143,
				id:12,
            
            show:false,address: "365 Weil Hall, Gainesville, FL 32611, United States"
        }, 
        {
            code: "BME", 
            title: "Broad Biomedical Engineering Building", 
            
                latitude: 28.5663939, 
                longitude: -82.3775697,
				id:13,
            
            show:false,address: "919 N Broad St, Brooksville, FL 34601, United States"
        }, 
        {
            code: "BMS", 
            title: "Biomedical Sciences", 
            
                latitude: 29.6406329, 
                longitude: -82.3455827,
				id:14,
            
            show:false,address: "1275 Center Dr, Gainesville, FL 32611, United States"
        }, 
        {
            code: "BRO", 
            title: "Broward Hall", 
            
                latitude: 29.6465352, 
                longitude: -82.3420708,
				id:15,
            
            show:false,address: "Broward Hall, 680 Broward Dr, Gainesville, FL 32603, USA"
        }, 
        {
            code: "BRT", 
            title: "Bryant Space Science Center", 
            
                latitude: 29.6488872, 
                longitude: -82.34574870000002,
				id:16,
            
            show:false,address: "Gainesville, FL 32603, United States"
        }, 
        {
            code: "BRY", 
            title: "Bryan Hall", 
            
                latitude: 29.65131189999999, 
                longitude: -82.3402381,
				id:17,
            
            show:false,address: "1384 Union Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "BSU", 
            title: "Veterinary Medicine - Basic Sciences", 
            
                latitude: 40.0929927, 
                longitude: -88.22091189999999,
				id:18,
            
            show:false,address: "2001 S Lincoln Ave, Urbana, IL 61802, United States"
        }, 
       
	   
        {
            code: "CAR", 
            title: "Carleton Auditorium", 
            
                latitude: 29.6490716, 
                longitude: -82.34172290000001,
				id:19,
            
            show:false,address: "1475 Union Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "CBD", 
            title: "Classroom Building 105", 
            
                latitude: 29.6529864, 
                longitude: -82.3429757,
				id:20,
            
            show:false,address: "Classroom Bldg 105, Gainesville, FL 32603, USA"
        }, 
        {
            code: "CGRC", 
            title: "Cancer/Genetics Research", 
            
                latitude: 29.6381861, 
                longitude: -82.3516905,
				id:21,
            
            show:false,address: "2033 Mowry Rd, Gainesville, FL 32608, United States"
        }, 
        {
            code: "CHE", 
            title: "Chemical Engineering", 
            
                latitude: 29.6436325, 
                longitude: -82.3549302,
				id:22,
            
			
            show:false,address: "Gainesville, FL 32611, United States"
        }, 
        {
            code: "CLB", 
            title: "Chemistry Laboratory Building", 
            
                latitude: 29.6508873, 
                longitude: -82.344152,
				id:23,
            
            show:false,address: "125 Buckman Dr, Gainesville, FL 32611, United States"
        }, 
        {
            code: "COM", 
            title: "Communicore - Health Sciences Center", 
            
                latitude: 29.6399441, 
                longitude: -82.343777,
				id:24,
            
            show:false,address: "1600 SW Archer Rd, Gainesville, FL 32610, United States"
        }, 
        {
            code: "CON", 
            title: "Constans Theatre", 
            
                latitude: 29.6460125, 
                longitude: -82.346482,
				id:25,
            
            show:false,address: "687 McCarty Dr, Gainesville, FL 32603, United States"
        }, 
        
		
        {
            code: "CRR", 
            title: "Carr Hall", 
            
                latitude: 29.6436325, 
                longitude: -82.3549302,
				id:26,
            
            show:false,address: "Gainesville, FL 32611, United States"
        }, 
       
	   
        {
            code: "CSE", 
            title: "Computer Science Engineering", 
            
                latitude: 29.64811109999999, 
                longitude: -82.344042,
				id:27,
            
            show:false,address: "432 Newell Dr, Gainesville, FL 32611, United States"
        }, 
        {
            code: "DAU", 
            title: "Dauer Hall - Arts & Sciences", 
            
                latitude: 29.64926969999999, 
                longitude: -82.3439549,
				id:28,
            
            show:false,address: "Gainesville, FL 32603, United States"
        }, 
        {
            code: "DSB", 
            title: "Dental Science Building", 
            
                latitude: 41.662549, 
                longitude: -91.55115090000001,
				id:29,
            
            show:false,address: "Dental Science Bldg, Iowa City, IA 52242, USA"
        }, 
        {
            code: "ESL", 
            title: "Environmental Stress Lab", 
            
                latitude: 29.6354601, 
                longitude: -82.3646433,
				id:30,
            
            show:false,address: "Gainesville, FL 32608, United States"
        }, 
        {
            code: "EYN", 
            title: "Entomology - Nematology", 
            
                latitude: 29.63483320000001, 
                longitude: -82.3673518,
				id:31,
            
            show:false,address: "1881 Natural Area Dr, Gainesville, FL 32608, United States"
        }, 
        {
            code: "FAA", 
            title: "Fine Arts A", 
            
                latitude: 29.6477756, 
                longitude: -82.3403431,
				id:32,
            
            show:false,address: "1389 Stadium Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "FAB", 
            title: "Fine Arts B (Gallery)", 
            
                latitude: 29.6482567, 
                longitude: -82.3396763,
				id:33,
            
            show:false,address: "400 SW 13th St, Gainesville, FL 32611, United States"
        }, 
        {
            code: "FAC", 
            title: "Fine Arts C", 
            
                latitude: 29.6477604, 
                longitude: -82.34041909999999,
				id:34,
            
            show:false,address: "Gainesville, FL 32601, United States"
        }, 
        {
            code: "FAD", 
            title: "Fine Arts D", 
            
                latitude: 29.6481722, 
                longitude: -82.3405634,
				id:35,
            
            show:false,address: "101 Fine Arts Bldg A, Gainesville, FL 32611, United States"
        }, 
        {
            code: "FIF", 
            title: "Fifield Hall", 
            
                latitude: 29.63838730000001, 
                longitude: -82.36116679999999,
				id:36,
            
            show:false,address: "Fifield Hall, Gainesville, FL 32603, USA"
        }, 
        {
            code: "FIRL", 
            title: "Plant Pathology Research Lab 1", 
            
                latitude: 30.5450208, 
                longitude: -84.5928081,
				id:37,
            
            show:false,address: "155 Research Rd, Quincy, FL 32351, United States"
        }, 
        {
            code: "FLAV", 
            title: "Flavet Field", 
            
                latitude: 29.6466255, 
                longitude: -82.3543578,
				id:38,
            
            show:false,address: "Woodlawn Dr, Gainesville, FL 32603, United States"
        }, 
        {
            code: "FLG", 
            title: "Florida Gym", 
            
                latitude: 29.64951450000001, 
                longitude: -82.34724109999999,
				id:39,
            
            show:false,address: "Florida Gymnasium, Gainesville, FL 32608, USA"
        }, 
        {
            code: "FLI", 
            title: "Keene-Flint Hall", 
            
                latitude: 29.6513768, 
                longitude: -82.34405009999999,
				id:40,
            
            show:false,address: "80 Newell Dr, Gainesville, FL 32611, United States"
        }, 
        {
            code: "FLO", 
            title: "Griffin-Floyd Hall", 
            
                latitude: 29.6500715, 
                longitude: -82.34367999999999,
				id:41,
            
            show:false,address: "230 Newell Dr, Gainesville, FL 32611, United States"
        }, 
        {
            code: "FSN", 
            title: "Food Science and Human Nutrition", 
            
                latitude: 29.6436325, 
                longitude: -82.3549302,
				id:42,
            
            show:false,address: "Gainesville, FL 32611, United States"
        }, 
        {
            code: "GER", 
            title: "Gerson Hall", 
            
                latitude: 29.65075890000001, 
                longitude: -82.3401306,
				id:43,
            
            show:false,address: "1368 Union Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "GRAO", 
            title: "Graham Hall", 
            
                latitude: 29.6458103, 
                longitude: -82.3502568,
				id:44
            , 
            show:false,address: "United States"
        }, 
        {
            code: "GRI", 
            title: "Grinter Hall - The Graduate School", 
            
                latitude: 29.6492787, 
                longitude: -82.34205949999999,
				id:45
            , 
            show:false,address: "1523 Union Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "HARN", 
            title: "Harn Museum of Art", 
            
                latitude: 29.6370616, 
                longitude: -82.3702266,
				id:46
            , 
            show:false,address: "3259 Hull Rd, Gainesville, FL 32607, United States"
        }, 
        {
            code: "HCAD", 
            title: "Health Science Center Admin. Services", 
            
                latitude: 30.3470314, 
                longitude: -81.6635251,
				id:47
            , 
            show:false,address: "653 W 8th St, Jacksonville, FL 32209, United States"
        }, 
        {
            code: "HDC", 
            title: "Human Development Center", 
            
                latitude: 46.8013063, 
                longitude: -92.0818267,
				id:48
            , 
            show:false,address: "1401 E 1st St, Duluth, MN 55805, United States"
        }, 
        {
            code: "HGS", 
            title: "Hough Hall", 
            
                latitude: 29.6504049, 
                longitude: -82.3406662,
				id:49
            , 
            show:false,address: "Hough Hall, Gainesville, FL 32611, USA"
        }, 
        {
            code: "HOL", 
            title: "Holland Law Center", 
            
                latitude: 29.6498009, 
                longitude: -82.35915059999999,
				id:50
            , 
            show:false,address: "Spessard L. Holland Law Center, Gainesville, FL 32603, USA"
        }, 
        {
            code: "HPNP", 
            title: "Health Professions, Nursing and Pharmacy Complex", 
            
                latitude: 29.6416764, 
                longitude: -82.3452497,
				id:51
            , 
            show:false,address: "Health Professions, Nursing, Pharmacy Bldg, 1225 Center Dr, Gainesville, FL 32603, USA"
        }, 

        {
            code: "HUB", 
            title: "The Hub - International Studies Center", 
            
                latitude: 29.6480995, 
                longitude: -82.34548769999999,
				id:52
            , 
            show:false,address: "Hub, 1765 Stadium Rd, Gainesville, FL 32603, United States"
        }, 
        {
            code: "HUME", 
            title: "Hume Hall", 
            
                latitude: 29.644475, 
                longitude: -82.3525058,
				id:53
            , 
            show:false,address: "Museum Rd, Gainesville, FL 32601, United States"
        }, 
        {
            code: "IBLC", 
            title: "Institute of Black Culture", 
            
                latitude: 29.652285, 
                longitude: -82.3421446,
				id:54
            , 
            show:false,address: "1510 W University Ave, Gainesville, FL 32603, United States"
        }, 
        {
            code: "IHLC", 
            title: "Institute of Hispanic-Latino Cultures", 
            
                latitude: 29.6436325, 
                longitude: -82.3549302,
				id:55
            , 
            show:false,address: "Gainesville, FL 32611, United States"
        }, 
        {
            code: "IIT", 
            title: "IFAS Information Technology", 
            
                latitude: 29.6465201, 
                longitude: -82.3443187,
				id:56
            , 
            show:false,address: "Gainesville, FL 32603, United States"
        }, 
        {
            code: "INF", 
            title: "Infirmary", 
            
                latitude: 29.6495392, 
                longitude: -82.34652009999999,
				id:57
            , 
            show:false,address: "Fletcher Dr, Gainesville, FL 32603, United States"
        }, 
        {
            code: "JENB", 
            title: "Jennings Hall B", 
            
                latitude: 29.6444873, 
                longitude: -82.34155299999999,
				id:58
            , 
            show:false,address: "1515 Museum Rd, Gainesville, FL 32612, United States"
        }, 
        {
            code: "KEY", 
            title: "Keys Complex - Student Housing", 
            
                latitude: 29.64918299999999, 
                longitude: -82.33802899999999,
				id:59
            , 
            show:false,address: "1231 SW 3rd Ave, Gainesville, FL 32601, United States"
        }, 
        {
            code: "LAR", 
            title: "Larsen Hall", 
            
                latitude: 29.6431067, 
                longitude: -82.34738279999999,
				id:60
            , 
            show:false,address: "Larsen Hall, Gainesville, FL 32603, USA"
        }, 
        {
            code: "LBW", 
            title: "Library West", 
            
                latitude: 29.6508246, 
                longitude: -82.3417565,
				id:61
            , 
            show:false,address: "1545 W University Ave, Gainesville, FL 32603, United States"
        }, 
        {
            code: "LEI", 
            title: "Leigh Hall", 
            
                latitude: 29.6504567, 
                longitude: -82.3442503,
				id:62
            , 
            show:false,address: "Leigh Hall, Gainesville, FL 32603, USA"
        }, 
        {
            code: "LIT", 
            title: "Little Hall", 
            
                latitude: 29.648841, 
                longitude: -82.3407919,
				id:63
            , 
            show:false,address: "Stadium Rd, Gainesville, FL 32601, United States"
        }, 
        {
            code: "LSP", 
            title: "Livestock Pavilion, Webb", 
            
                latitude: 29.6339886, 
                longitude: -82.3511053,
				id:64
            , 
            show:false,address: "United States"
        }, 
        {
            code: "MAE", 
            title: "Materials Engineering", 
            
                latitude: 29.6476334, 
                longitude: -82.3490228,
				id:65
            , 
            show:false,address: "Gainesville, FL 32603, United States"
        }, 
        {
            code: "MAEA", 
            title: "Mechanical and Aerospace Engineering, Bldg. A", 
            
                latitude: 29.6436325, 
                longitude: -82.3549302,
				id:66
            , 
            show:false,address: "Gainesville, FL 32611, United States"
        }, 

        {
            code: "MAT", 
            title: "Matherly Hall", 
            
                latitude: 29.65163059999999, 
                longitude: -82.3410518,
				id:67
            , 
            show:false,address: "1405 W University Ave, Gainesville, FL 32611, United States"
        }, 
        {
            code: "MBI", 
            title: "McKnight Brain Institute", 
            
                latitude: 29.6436325, 
                longitude: -82.3549302,
				id:68
            , 
            show:false,address: "Gainesville, FL 32611, United States"
        }, 
        {
            code: "MCCA", 
            title: "McCarty Hall, Bldg. A", 
            
                latitude: 29.6466758, 
                longitude: -82.3453474,
				id:69
            , 
            show:false,address: "McCarty Hall C, Gainesville, FL 32603, USA"
        }, 
        {
            code: "MCCB", 
            title: "McCarty Hall, Bldg. B", 
            
                latitude: 29.6467422, 
                longitude: -82.34492809999999,
				id:70
            , 
            show:false,address: "McCarty Hall B, Gainesville, FL 32603, USA"
        }, 
        {
            code: "MCCC", 
            title: "McCarty Hall, Bldg. C", 
            
                latitude: 29.6466758, 
                longitude: -82.3453474,
				id:71
            , 
            show:false,address: "McCarty Hall C, Gainesville, FL 32603, USA"
        }, 
        {
            code: "MCCD", 
            title: "McCarty Hall, Bldg D", 
            
                latitude: 29.6465202, 
                longitude: -82.3443186,
				id:72
            , 
            show:false,address: "McCarty Hall D, Gainesville, FL 32603, USA"
        }, 
        {
            code: "MCG", 
            title: "McGuire Center for Lepidoptera Research", 
            
                latitude: 29.6358453, 
                longitude: -82.3712611,
				id:73
            , 
            show:false,address: "McGuire Center for Lepidoptera Research, Gainesville, FL 32608, USA"
        }, 
        {
            code: "MCSB", 
            title: "Microbiology and Cell Science", 
            
                latitude: 29.6399739, 
                longitude: -82.3628019,
				id:74
            , 
            show:false,address: "1355 Museum Drive, Gainesville, FL 32603, United States"
        }, 

        {
            code: "MSL", 
            title: "Marston Science Library", 
            
                latitude: 29.6479572, 
                longitude: -82.3439199,
				id:75
            , 
            show:false,address: "444 Newell Dr, Gainesville, FL 32611, United States"
        }, 
        {
            code: "MUB", 
            title: "Music Building", 
            
                latitude: 29.6481303, 
                longitude: -82.3425575,
				id:76
            , 
            show:false,address: "Gainesville, FL 32611, United States"
        }, 
        {
            code: "MUS", 
            title: "Florida Museum of Natural History - Dickinson Hall", 
            
                latitude: 29.6445166, 
                longitude: -82.3438233,
				id:77
            , 
            show:false,address: "1659 Museum Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "NEB", 
            title: "Engineering Building", 
            
                latitude: 29.6483809, 
                longitude: -82.3485106,
				id:78
            , 
            show:false,address: "1949 Stadium Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "NEW", 
            title: "Newell Hall", 
            
                latitude: 29.6490871, 
                longitude: -82.34505709999999,
				id:79
            , 
            show:false,address: "Newell Hall, Gainesville, FL 32603, USA"
        }, 
        {
            code: "NPB", 
            title: "Physics Building", 
            
                latitude: 29.6437825, 
                longitude: -82.3496895,
				id:80
            , 
            show:false,address: "2001 Museum Rd, Gainesville, FL 32603, United States"
        }, 
        {
            code: "NRB", 
            title: "Nuclear Reactor", 
            
                latitude: 29.6436325, 
                longitude: -82.3549302,
				id:81
				
            , 
            show:false,address: "Gainesville, FL 32611, United States"
        }, 
        {
            code: "NRG", 
            title: "Norman Gymnasium", 
            
                latitude: 35.220559, 
                longitude: -97.4448615,
				id:82
            , 
            show:false,address: "119 W Main St, Norman, OK 73069, United States"
        }, 
        {
            code: "NRN", 
            title: "Norman Hall", 
            
                latitude: 29.6469686, 
                longitude: -82.3381103,
				id:83
            , 
            show:false,address: "Norman Hall, Gainesville, FL 32601, USA"
        }, 
        {
            code: "NRNA", 
            title: "Norman Hall Addition", 
            
                latitude: 29.64664469999999, 
                longitude: -82.33768599999999,
				id:84
            , 
            show:false,address: "Norman Hall Addition, Gainesville, FL 32601, USA"
        }, 
        {
            code: "NSC", 
            title: "Nuclear Sciences Center", 
            
                latitude: 30.5810924, 
                longitude: -96.3629133,
				id:85
            , 
            show:false,address: "1095 Nuclear Science Rd, College Station, TX 77843, United States"
        }, 
        {
            code: "NUL", 
            title: "Animal Nutrition Labratory", 
            
                latitude: 40.10381579999999, 
                longitude: -88.22516139999999,
				id:86
            , 
            show:false,address: "1207 W Gregory Dr, Urbana, IL 61801, United States"
        }, 
        {
            code: "NZH", 
            title: "Newins-Ziegler Hall", 
            
                latitude: 29.64539199999999, 
                longitude: -82.345686,
				id:87
            , 
            show:false,address: "Newins-Ziegler Hall, Gainesville, FL 32603, USA"
        }, 
        {
            code: "ODAA", 
            title: "Office of Development and Alumni Affairs", 
            
                latitude: 29.6398626, 
                longitude: -82.343434,
				id:88
            , 
            show:false,address: "1600 SW Archer Rd, Gainesville, FL 32610, United States"
        }, 
        {
            code: "OBS", 
            title: "Student Observatory", 
            
                latitude: 37.4191274, 
                longitude: -122.181827,
				id:89
            , 
            show:false,address: "30 Alta Rd, Palo Alto, CA 94305, United States"
        }, 
        {
            code: "PCPA", 
            title: "Phillips Center for the Performing Arts", 
            
                latitude: 29.6352583, 
                longitude: -82.36930579999999,
				id:90
            , 
            show:false,address: "3201 Hull Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "PEA", 
            title: "Peabody Hall", 
            
                latitude: 29.6500771, 
                longitude: -82.3419924,
				id:91
            , 
            show:false,address: "Union Rd, Gainesville, FL 32603, United States"
        }, 
        {
            code: "PHL", 
            title: "Phelps Laboratory", 
            
                latitude: 41.1091195, 
                longitude: -73.8639555,
				id:92
            , 
            show:false,address: "701 N Broadway, Sleepy Hollow, NY 10591, United States"
        }, 
        {
            code: "PKY", 
            title: "P. K. Yonge Developmental Research School, 1080 SW 11 Street", 
            
                latitude: 29.64006539999999, 
                longitude: -82.3346766,
				id:93
            , 
            show:false,address: "1080 SW 11th St, Gainesville, FL 32601, United States"
        }, 
        {
            code: "POOL", 
            title: "Florida Pool", 
            
                latitude: 29.6462255, 
                longitude: -82.3409362,
				id:94
            , 
            show:false,address: "Gainesville, FL 32603, United States"
        }, 
        {
            code: "POW", 
            title: "Powell Hall - New Museum of Natural History", 
            
                latitude: 29.6358224, 
                longitude: -82.3704006,
				id:95
            , 
            show:false,address: "3215 Hull Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "PPD", 
            title: "Physical Plant Offices", 
            
                latitude: 29.6443197, 
                longitude: -82.3705092,
				id:96
            , 
            show:false,address: "Physical Plant Offices, Gainesville, FL 32607, USA"
        }, 
        {
            code: "PRL", 
            title: "Food and Environmental Toxicology Lab", 
            
                latitude: 29.6436325, 
                longitude: -82.3549302,
				id:97
            , 
            show:false,address: "Gainesville, FL 32611, United States"
        }, 
        {
            code: "PSB", 
            title: "Shands Patient Services", 
            
                latitude: 29.6388866, 
                longitude: -82.3423068,
				id:98
             , 
            show:false,address: "1515 SW Archer Rd, Gainesville, FL 32608, United States"
        }, 
        {
            code: "PSF", 
            title: "Plant Science Facility", 
            
                latitude: 29.6436325, 
                longitude: -82.3549302,
				id:99
            , 
            show:false,address: "Gainesville, FL 32611, United States"
        }, 
        {
            code: "PST", 
            title: "Particle Sciences and Technology", 
            
                latitude: 40.671417, 
                longitude: -75.37462699999999,
				id:100
            , 
            show:false,address: "3894 Courtney St, Bethlehem, PA 18017, United States"
        }, 
        {
            code: "PSY", 
            title: "Psychology", 
            
                latitude: 29.67284690000001, 
                longitude: -82.38416389999999,
				id:101
            , 
            show:false,address: "2121 NW 40th Terrace Ste B, Gainesville, FL 32605, United States"
        }, 
        {
            code: "PUGH", 
            title: "Pugh Hall", 
            
                latitude: 29.6494289, 
                longitude: -82.34546309999999,
				id:102
            , 
            show:false,address: "Pugh Hall, Gainesville, FL 32603, USA"
        }, 
        {
            code: "RCD", 
            title: "Recreation Center Dining", 
            
                latitude: 29.650204, 
                longitude: -82.3464309,
				id:103
            , 
            show:false,address: "114 Rec Center, Gainesville, FL 32611, United States"
        }, 
        {
            code: "REI", 
            title: "Reitz Union", 
            
                latitude: 29.6463395, 
                longitude: -82.3476523,
				id:104
            , 
            show:false,address: "686 Museum Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "RFC", 
            title: "Recreation and Fitness Center", 
            
                latitude: 29.6501107, 
                longitude: -82.34675969999999,
				id:105
            , 
            show:false,address: "244 Fletcher Dr, Gainesville, FL 32603, United States"
        }, 
        {
            code: "RHN", 
            title: "Rhines Hall", 
            
                latitude: 29.6476341, 
                longitude: -82.34902249999999,
				id:106
            , 
            show:false,address: "Rhines Hall, Gainesville, FL 32603, USA"
        }, 
        {
            code: "RLA", 
            title: "Reed Lab", 
            
                latitude: 42.31957420000001, 
                longitude: -71.0979212,
				id:150
            , 
            show:false,address: "55 Dimock St, Boston, MA 02119, United States"
        }, 
        {
            code: "RL1", 
            title: "Research Laboratory", 
            
                latitude: 29.634407, 
                longitude: -82.371461,
				id:107
            , 
            show:false,address: "1911 SW 34th St, Gainesville, FL 32608, United States"
        }, 
        {
            code: "RNK", 
            title: "Rinker Hall", 
            
                latitude: 29.64695920000001, 
                longitude: -82.34316059999999,
				id:108
            , 
            show:false,address: "Rinker Hall, 573 Newell Dr, Gainesville, FL 32603, USA"
        }, 
        {
            code: "ROG", 
            title: "Rogers Hall", 
            
                latitude: 29.6449409, 
                longitude: -82.3449972,
				id:109
            , 
            show:false,address: "United States"
        }, 
        {
            code: "ROL", 
            title: "Rolfs Hall", 
            
                latitude: 29.6492897, 
                longitude: -82.3444921,
				id:110
            , 
            show:false,address: "Rolfs Hall, Gainesville, FL 32603, USA"
        }, 
        {
            code: "SBH", 
            title: "Steinbrenner Band Hall", 
            
                latitude: 29.6436325, 
                longitude: -82.3549302
				,id:111
            , 
            show:false,address: "Gainesville, FL 32611, United States"
        }, 
        {
            code: "SIS", 
            title: "Sisler Hall - Chemistry Research Bldg", 
            
                latitude: 29.6499992, 
                longitude: -82.34416809999999,
				id:112
            , 
            show:false,address: "1680 Union Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "SMA", 
            title: "Library East, Smathers", 
            
                latitude: 29.6515513, 
                longitude: -82.34281469999999,
				id:113
            , 
            show:false,address: "1545 W University Ave, University of Florida, Gainesville, FL 32611, United States"
        }, 
        {
            code: "SOC", 
            title: "Stephen C. O'Connell Center Pool", 
            
                latitude: 29.6462255, 
                longitude: -82.3409362,
				id:114
            , 
            show:false,address: "Gainesville, FL 32603, United States"
        }, 
        {
            code: "SPRC", 
            title: "Springs Commons Building", 
            
                latitude: 29.6423855, 
                longitude: -82.34048229999999,
				id:115
            , 
            show:false,address: "Diamond Village Commons Bldg, 1402 Diamond Rd, Gainesville, FL 32603, USA"
        }, 
        {
            code: "SRPT", 
            title: "IFAS Support Services", 
            
                latitude: 29.6465201, 
                longitude: -82.3443187,
				id:116
            , 
            show:false,address: "Gainesville, FL 32603, United States"
        }, 
        {
            code: "SSB", 
            title: "Criser Hall", 
            
                latitude: 29.6501881, 
                longitude: -82.34160899999999,
				id:117
            , 
            show:false,address: "1478 Union Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "STA", 
            title: "Stadium, Ben Hill Griffin", 
            
                latitude: 29.6499357, 
                longitude: -82.3485788,
				id:118
            , 
            show:false,address: "157 Gale Lemerand Dr, Gainesville, FL 32601, United States"
        }, 
        {
            code: "STZ", 
            title: "Stuzin Hall - Business Building", 
            
                latitude: 29.650815, 
                longitude: -82.3411782
				,id:119
            , 
            show:false,address: "1454, 100 Stuzin Hall Union Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "SWC", 
            title: "SW Recreation Complex", 
            
                latitude: 27.8920203, 
                longitude: -82.8187822,
				id:120
            , 
            show:false,address: "13120 Vonn Rd, Largo, FL 33774, United States"
        }, 
        {
            code: "THC", 
            title: "Teaching Hospital and Clinics, Shands", 
            
                latitude: 29.659113, 
                longitude: -82.3928509,
				id:121
            , 
            show:false,address: "4645 NW 8th Ave, Gainesville, FL 32605, United States"
        }, 
        {
            code: "TIG", 
            title: "Tigert Hall - UF Administration", 
            
                latitude: 29.6436325, 
                longitude: -82.3549302,
				id:122
            , 
            show:false,address: "Gainesville, FL 32611, United States"
        }, 
        {
            code: "TUR", 
            title: "Turlington Hall", 
            
                latitude: 29.6489642, 
                longitude: -82.343747,
				id:123
            , 
            show:false,address: "330 Newell Dr, Gainesville, FL 32611, United States"
        }, 
        {
            code: "UST", 
            title: "Ustler Hall", 
            
                latitude: 29.65044320000001, 
                longitude: -82.3468705,
				id:124
            , 
            show:false,address: "Ustler Hall, Gainesville, FL 32608, USA"
        }, 
        {
            code: "VAN", 
            title: "Van Fleet Hall - ROTC", 
            
                latitude: 29.6485548, 
                longitude: -82.3511003,
				id:125
            , 
            show:false,address: "204 Van Fleet Hall, Gainesville, FL 32611, United States"
        }, 
        {
            code: "VET", 
            title: "Veterinary Science", 
            
                latitude: 29.6332527, 
                longitude: -82.3502601,
				id:126
            , 
            show:false,address: "2015 SW 16th Ave, Gainesville, FL 32608, United States"
        }, 
        {
            code: "VMAW", 
            title: "Veterinary Medicine - Academic Wing", 
            
                latitude: 29.6338194, 
                longitude: -82.3487936,
				id:127
            , 
            show:false,address: "Veterinary Medicine Academic Bldg, Gainesville, FL 32608, USA"
        }, 
        {
            code: "WAL", 
            title: "Walker Hall", 
            
                latitude: 29.64937919999999, 
                longitude: -82.34153959999999,
				id:128
            , 
            show:false,address: "1489 Union Rd, Gainesville, FL 32611, United States"
        }, 
        {
            code: "WALC", 
            title: "Wallace Hall", 
            
                latitude: 33.9958184, 
                longitude: -85.9915726,
				id:129
            , 
            show:false,address: "1001 George Wallace Dr, Gadsden, AL 35903, United States"
        }, 
        
        {
            code: "WAU", 
            title: "Lake Wauburg", 
            
                latitude: 29.5298432, 
                longitude: -82.30313,
				id:130
            , 
            show:false,address: "Lake Wauburg, Florida 32667, USA"
        }, 
        {
            code: "WEIL", 
            title: "Weil Hall", 
            
                latitude: 29.64838079999999, 
                longitude: -82.3485109,
				id:131
            , 
            show:false,address: "Weil Hall, Gainesville, FL 32603, USA"
        }, 
        {
            code: "WEIM", 
            title: "Weimer Hall", 
            
                latitude: 29.6478351, 
                longitude: -82.34752759999999,
				id:132
            , 
            show:false,address: "Weimer Hall, Gainesville, FL 32603, USA"
        }, 
        {
            code: "WM", 
            title: "Williamson Hall", 
            
                latitude: 29.6436325, 
                longitude: -82.3549302,id:133
		
            , 
            show:false,address: "Gainesville, FL 32611, United States"
        }, 
        {
            code: "WSFL", 
            title: "Weed Sciences Field Building", 
            
                latitude: 29.6391841, 
                longitude: -82.36376249999999,id:134
            , 
            show:false,address: "Weed Sciences Field Bldg, Gainesville, FL 32603, USA"
        }, 
        {
            code: "YON", 
            title: "Yon Hall", 
            
                latitude: 29.6498808, 
                longitude: -82.3478071,id:135
            , 
            show:false,address: "Gainesville, FL 32608, United States"
        }];		 
		   
		
	};
	
	$scope.onClick = function(marker, eventName, model) {
            console.log("Marker Clicked!");
            model.show = !model.show;
        };
	
	
  }
]);