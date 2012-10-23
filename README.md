Toronto Address Points Open Dataset Geocoder
============================================

Primitive Geocoder REST web service to provide [address geocoding](http://en.wikipedia.org/wiki/Geocoding) for Toronto, Canada, addresses based on the [Toronto Address Points Open Dataset](http://www1.toronto.ca/wps/portal/open_data/open_data_item_details?vgnextoid=91415f9cd70bb210VgnVCM1000003dd60f89RCRD&vgnextchannel=6e886aa8cc819210VgnVCM10000067d60f89RCRD). The implementation is written in Node.js and accesses address data from a MongoDB.

Given a well formed Toronto street address, such as "200 Adelaide St W", the service will return details associated with that address.
* Primitive address parsing at the moment....
* Every Toronto address is geoceded so no need for address interpolation
* Returns Latitude and Longitude of address
* For more details see the [source dataset information](http://www1.toronto.ca/wps/portal/open_data/open_data_item_details?vgnextoid=91415f9cd70bb210VgnVCM1000003dd60f89RCRD&vgnextchannel=6e886aa8cc819210VgnVCM10000067d60f89RCRD). 

There is a instance of the Geocoder service running on Heroku for you to try out and use.
* [Home Page](http://toronto-addresspoints-geocoder.herokuapp.com/) 
* [200 Adelaide St W](http://toronto-addresspoints-geocoder.herokuapp.com/locations?q=200%20Adelaide%20St%20W)
* [1 Unknown St](http://toronto-addresspoints-geocoder.herokuapp.com/locations?q=1%20Unknown%20St%)


Requirements
------------

* Node.js 0.8+
* MongoDB loaded with the [Toronto Address Points Open Dataset](http://www1.toronto.ca/wps/portal/open_data/open_data_item_details?vgnextoid=91415f9cd70bb210VgnVCM1000003dd60f89RCRD&vgnextchannel=6e886aa8cc819210VgnVCM10000067d60f89RCRD) 


Setup Dataset
-------------

The Geocoder service requires a MongoDB collection with the content of the [Toronto Address Points Open Dataset](http://www1.toronto.ca/wps/portal/open_data/open_data_item_details?vgnextoid=91415f9cd70bb210VgnVCM1000003dd60f89RCRD&vgnextchannel=6e886aa8cc819210VgnVCM10000067d60f89RCRD). You may use the same read-only database of addresses that is used by the test instance or you can create your own Mongo DB instance populated from the published Toronto Address Points open dataset using the sibling open-source [Exporter tool](https://github.com/Intelliware/torontoopendata-addresspoints-exporter).


Building and Running
--------------------

    npm install
    node geocode.js

You should then be able to hit the local service at: [http://localhost:8081](http://localhost:8081)

By default the code will use a read-only database of addresses hosted on MongoHQ. You can instead use an alternative Mongo DB by setting the MONGO_URL and MONGO_COLLECTION environment variables.


Licence
-------

This tool is made available under the [MIT licence](http://opensource.org/licenses/mit-license.php).

The Dataset is made available under the [Open Data Licence for City of Toronto Datasets](http://www1.toronto.ca/wps/portal/open_data/open_data_fact_sheet_details?vgnextoid=59986aa8cc819210VgnVCM10000067d60f89RCRD).



David Jones
