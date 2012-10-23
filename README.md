Toronto Address Points Open Dataset Geocoder
============================================

Primitive address Geocoder REST web service to provide geocoding for Toronto, Canada, addresses based on the [Toronto Address Points Open Dataset](http://www1.toronto.ca/wps/portal/open_data/open_data_item_details?vgnextoid=91415f9cd70bb210VgnVCM1000003dd60f89RCRD&vgnextchannel=6e886aa8cc819210VgnVCM10000067d60f89RCRD). The implementation is written in Node.js and accesses address data from a MongoDB.

At this point the capabilities of the service are very basic in deed and it is rather brittle with regard to address formats. 

There is a instance of the geocoder service running on Heroku for you to try out.
* [Home Page](http://toronto-addresspoints-geocoder.herokuapp.com/) 
* [200 Adelaide St W](http://toronto-addresspoints-geocoder.herokuapp.com/locations?q=200%20Adelaide%20St%20W)
* [1 Unknown St](http://toronto-addresspoints-geocoder.herokuapp.com/locations?q=1%20Unknown%20St%)


Requirements
------------

* Node.js 0.8+
* MongoDB loaded with the [Toronto Address Points Open Dataset](http://www1.toronto.ca/wps/portal/open_data/open_data_item_details?vgnextoid=91415f9cd70bb210VgnVCM1000003dd60f89RCRD&vgnextchannel=6e886aa8cc819210VgnVCM10000067d60f89RCRD) 


Setup Dataset
-------------

The geocoder service requires a MongoDB collection with the content of the [Toronto Address Points Open Dataset](http://www1.toronto.ca/wps/portal/open_data/open_data_item_details?vgnextoid=91415f9cd70bb210VgnVCM1000003dd60f89RCRD&vgnextchannel=6e886aa8cc819210VgnVCM10000067d60f89RCRD). You may use the same read-only database of addresses used by the test instance or you can create your own Mongo DB instance from the published Toronto Address Points open dataset using the sibling open-source [Exporter tool](https://github.com/Intelliware/torontoopendata-addresspoints-exporter).


Building and Running
--------------------

    npm install
    node geocode.js

You should then be able to hit the local service at: http://localhost:8081

By default the code will use a read-only database of addresses hosted on MongoHQ. You can use an alternative Mongo DB by setting the MONGO_URL and MONGO_COLLECTION environment variables.


Licence
-------

This tool is made available under the [MIT licence](http://opensource.org/licenses/mit-license.php).

The Dataset is made available under the [Open Data Licence for City of Toronto Datasets](http://www1.toronto.ca/wps/portal/open_data/open_data_fact_sheet_details?vgnextoid=59986aa8cc819210VgnVCM10000067d60f89RCRD).



David Jones
