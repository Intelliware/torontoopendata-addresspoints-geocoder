Toronto Address Points Open Dataset Geocoder
============================================

Primitive REST web service to provide geocoding for Toronto, Canada, addresses based on the [Toronto Address Points Open Dataset](http://www1.toronto.ca/wps/portal/open_data/open_data_item_details?vgnextoid=91415f9cd70bb210VgnVCM1000003dd60f89RCRD&vgnextchannel=6e886aa8cc819210VgnVCM10000067d60f89RCRD). The implementation is based on Node.js and accesses address data from a MongoDB.

At this point the capabilities of the service are very basic in deed and it is rather brittle with regard to address formats. 

There is a instance of the geocoder service running on Heroku for you to try out.

For the Toronto
http://rocky-headland-4081.herokuapp.com/



Requirements
------------

* Node.js 0.8+
* MongoDB loaded with the [Toronto Address Points Open Dataset](http://www1.toronto.ca/wps/portal/open_data/open_data_item_details?vgnextoid=91415f9cd70bb210VgnVCM1000003dd60f89RCRD&vgnextchannel=6e886aa8cc819210VgnVCM10000067d60f89RCRD) 


Setup Dataset
-------------

The geocoder service


Building and Running
--------------------



    npm install
    node geocode.js


Licence
-------

This tool is made available under the [MIT licence](http://opensource.org/licenses/mit-license.php).

The Dataset is made available under the [Open Data Licence for City of Toronto Datasets](http://www1.toronto.ca/wps/portal/open_data/open_data_fact_sheet_details?vgnextoid=59986aa8cc819210VgnVCM10000067d60f89RCRD).



David Jones
