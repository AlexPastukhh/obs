topic notes 
day 7
Topic note : middleware, writeasjson
details: some basics of middleware, what u can capture in ctore from di as services? 
invoke method arguments di for middleware methods

day 8
Topic note : allocations
details: what they mat cause for asp.net core app server



day 8
Topic note :filters
details: basics of filters, order,ordering,types of filters, what need to register in di and when, what filter classes can use and how they differ, interfaces vs specific filter classes

day 9
Topic note :scopes and idisposable
details:  basics, without deep dive into finalizers



day 9
Topic note : routing,route params tech info, custom constraints,router matching
details:

day 10
Topic note : owned entity
details:
block:

day 10
Topic note :automatic problem details from modelstate,apicontroller filter invalidmodelstateresponsefactory
details:
block:

day 10
Topic note :modelstate 
details:some basics, methods,properties, prefix explaination
block:

day  12
Topic note : actiondescriptor,controlleractiondescriptor,endpoint,metadata, route or endpoint name, iapiendpointmetadata, ordered metadata
details: iendpointnamemetadata
iroutenamemetadata
block:iendpointnamemetadata
iroutenamemetadata

day 13
Topic note :fluent validation
details:
block:

day 13
Topic note : ef has conversion, value converte,comparer
details: here without QUERING WITH LIST OF PRIMITIVES
block:

day 14
Topic note : BINDING SOURCE ATTRIBUTES;  ROUTE PARAMS,QUERY STRING BASICS;ROUTING,ROUTE DESIGN, RESOURCES,ROUTING ALL GOOD PRACT IN GENERAL EXPLAINED
details:
block: 

day 14
Topic note :REST API BASICS 
details:
block:FULL OVERVIEW OF METHODS; some basic things;some general base things;method safety/ idempotency

day 14
Topic note : CREATION REQUEST,POST REQUEST,LOCACTION HEADER,CREATED AT
details:
block:

day 15
Topic note : HEAD REQUEST; ROUTE NESTING
details:
block:

day  15
Topic note :  ETAG, e tag;last modified header, implementation, expirational model
details:  
block:

day 15
Topic note :  PUT,PATCH
details:
block:

day  16
Topic note :  options requ;IVALIDATABLE OBJECT, VALIDATION ATTRIBUTES;FILTERING AND SEARCHING
details:
block:

day  16
Topic note :  REST API BASICS
details:
block:Validation;PATCH VALIDATION
PROBLEM DET LOWER;PROBLEM DETAILS,

day  
Topic note :  SORTING,MAPPING SERVICE
details:
block:

day  17
Topic note :  PAGING;data shaping,expando;root document
details:
block:

day  
Topic note :  hateoas
details:
block:


day  18
Topic note :  CONTENT NEGOTIATION RES API,FORMATTERS, XML,JSON
details:
block:


day  
Topic note :  FULL CONTENT NEG + VALIDATION FLOW
details:
block:


day  19
Topic note :  vary header;cache control headers and response caching
details:
block:


day  
Topic note :  streaming
details:
block:streaming objects;"ASYNCENUMERABLE, WHY" ;NDJSON,FLUSHASYNC FOR
STREAMING OBJECTS,EXPLAINATION OF PLAIN ARRAY STREAMING VS NDJSON STREAMING
BENEFITS AND USECASES WITH PLAIN ARRAY,


day  
Topic note :  async processing of multiple calls,parallelism
details:
block: Sumary -whole block with border


day  
Topic note :  "cancellation,async"; valuetask;membernotnull attribute,NULL
details:
block:


day  20 
Topic note :  problem details; FILTER,MIDDLEWARE CANCELLATION,REQUEST ABORTED;  QS PREFERENCE WITH MULTIPLE ACCEPT HEADER VALUES HELPER
details:
block:

day 21 
Topic note : httpclient,summary,theory,base usage,jsonoptions wrapper,handlers
details: 
block:

day 21 
Topic note : MEDIA TYPES OF REQUESTS
details:
block:

day 22 
Topic note : statuscodepages; EXCEPTION HANDLERS
, 
details:
block:

day 
Topic note : ALL ABOUT REQ RES ,,,,,,,TYPES OF REQUEST CONTENT httpclient part, server part, pipereader pipewriter stream reader stream writer
details:
block: httpclient part - types, contenttype headers on
content type
not requestmessage,  when reading response

day 23 
Topic note :"when need to add content type, encoding";compression,decompression,request,response;
details:
block: everything but only high level of block: handling multiple encodings (rarely implemented) is needed

day 
Topic note :ALL ABOUT REQ RES ,,,,,,,TYPES OF REQUEST CONTENT httpclient part, server part, pipereader pipewriter stream reader stream writer
details:
block:httpclient part - sending json ;memorystream + stream content
vs
jsoncontent.create; new buffering  sheet 
when you generally buffer full bytes of response using httpclient
when you dont buffer full response and process as stream; buffering; using delegate handler to fix streaming issues + retries; jsoncontent.create/content-length issue
transfer-encoding: chuncked; 

day 
Topic note : httpcontent,custom one, readasstream buffering, compression directly to network
details:
block:

day 
Topic note : streaming
details:
block: streaming bytes;different types of byte streams and usecases

day 24
Topic note : httpcontext items and features;Lazy;link generator;jsonconverter; 
details:
block:

day 25
Topic note : problem2; event source browser
details:
block:


day 25
Topic note :  streaming
details:
block:SSE; sse examples
body + event
heartbeat; sse writer 
возможно стоит распределить лучше по дням из за неравномерности