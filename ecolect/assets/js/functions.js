// JavaScript Document
var $ = jQuery;


$(document).ready(function() {

	// Page scrolling
	$(function() {

	    $('a').bind('click',function(event){
	        var $anchor = $(this);
	 
	        $('html, body').stop().animate({
	            scrollTop: $($anchor.attr('href')).offset().top - 60
	        }, 1500,'easeInOutExpo', function() {
	       
		        window.location.hash = $anchor.html();
				//history.go(window.location);
	        
	        });

	       
	        
	        event.preventDefault();
	        
	    });
	});
	

});