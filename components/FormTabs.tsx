// import React, {useEffect} from 'react';
import styles from "../styles/Styles.module.scss";
// var jsdom = require("jsdom");
// var window = jsdom.jsdom().createWindow();
// var $ = require("jquery")( window );
// import $ from 'jquery';
// var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
// $('.wizard-card').bootstrapWizard({
//     'tabClass': 'nav nav-pills',
//     'nextSelector': '.btn-next',
//     'previousSelector': '.btn-previous',

//     onNext: (tab: any, navigation: any, index: number): false | void => {
//       var $valid = $('.wizard-card form').valid();
//       if (!$valid) {
//         // $validator.focusInvalid();
//         return false;
//       }
//     },

//     onInit: (tab: any, navigation: any, index: any) => {

//       // check number of tabs and fill the entire row
//       let $total = navigation.find('li').length;
//       let $wizard = navigation.closest('.wizard-card');

//       let $first_li = navigation.find('li:first-child a').html();
//       let $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
//       $('.wizard-card .wizard-navigation').append($moving_div);

//       $total = $wizard.find('.nav li').length;
//       let $li_width = 100 / $total;

//       let total_steps = $wizard.find('.nav li').length;
//       let move_distance = $wizard.width() / total_steps;
//       let index_temp = index;
//       let vertical_level = 0;

//       let mobile_device = $(document).width() < 600 && $total > 3;

//       if (mobile_device) {
//         move_distance = $wizard.width() / 2;
//         index_temp = index % 2;
//         $li_width = 50;
//       }

//       $wizard.find('.nav li').css('width', $li_width + '%');

//       let step_width = move_distance;
//       move_distance = move_distance * index_temp;

//       let $current = index + 1;

//       if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
//         move_distance -= 8;
//       } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
//         move_distance += 8;
//       }

//       if (mobile_device) {
//         let x: any = index / 2;
//         vertical_level = parseInt(x);
//         vertical_level = vertical_level * 38;
//       }

//       $wizard.find('.moving-tab').css('width', step_width);
//       $('.moving-tab').css({
//         'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
//         'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
//       });
//       $('.moving-tab').css('transition', 'transform 0s');
//     },

//     onTabClick: (tab: any, navigation: any, index: any) => {

//       const $valid = $('.wizard-card form').valid();

//       if (!$valid) {
//         return false;
//       } else {
//         return true;
//       }
//     },

//     onTabShow: (tab: any, navigation: any, index: any) => {
//       let $total = navigation.find('li').length;
//       let $current = index + 1;
//       // elemMainPanel.scrollTop = 0;
//       console.log({'total':$total, 'current': $current})
//       const $wizard = navigation.closest('.wizard-card');

//       // If it's the last tab then hide the last button and show the finish instead
//      /* if (($current >= $total) && ($current !== 4)) {
//         $($wizard).find('.btn-next').hide();
//         $($wizard).find('.btn-payment').hide();
//         $($wizard).find('.btn-finish').show();
//       } else if ($current === 4) {
//         $($wizard).find('.btn-next').hide();
//         $($wizard).find('.btn-finish').hide();
//         $($wizard).find('.btn-payment').show();
//       }
//       else {
//         $($wizard).find('.btn-next').show();
//         $($wizard).find('.btn-finish').hide();
//         $($wizard).find('.btn-payment').hide();
//       } */

//       if ($current >= $total) {
//         $($wizard).find('.btn-next').hide();
//         $($wizard).find('.btn-finish').show();
//       } 
//       else {
//         $($wizard).find('.btn-next').show();
//         $($wizard).find('.btn-finish').hide();
//       }

//       const button_text = navigation.find('li:nth-child(' + $current + ') a').html();

//       setTimeout(function () {
//         $('.moving-tab').text(button_text);
//       }, 150);

//       const checkbox = $('.footer-checkbox');

//       if (index !== 0) {
//         $(checkbox).css({
//           'opacity': '0',
//           'visibility': 'hidden',
//           'position': 'absolute'
//         });
//       } else {
//         $(checkbox).css({
//           'opacity': '1',
//           'visibility': 'visible'
//         });
//       }
//       $total = $wizard.find('.nav li').length;
//       let $li_width = 100 / $total;

//       let total_steps = $wizard.find('.nav li').length;
//       let move_distance = $wizard.width() / total_steps;
//       let index_temp = index;
//       let vertical_level = 0;

//       let mobile_device = $(document).width() < 600 && $total > 3;

//       if (mobile_device) {
//         move_distance = $wizard.width() / 2;
//         index_temp = index % 2;
//         $li_width = 50;
//       }

//       $wizard.find('.nav li').css('width', $li_width + '%');

//       let step_width = move_distance;
//       move_distance = move_distance * index_temp;

//       $current = index + 1;

//       if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
//         move_distance -= 8;
//       } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
//         move_distance += 8;
//       }

//       if (mobile_device) {
//         let x: any = index / 2;
//         vertical_level = parseInt(x);
//         vertical_level = vertical_level * 38;
//       }

//       $wizard.find('.moving-tab').css('width', step_width);
//       $('.moving-tab').css({
//         'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
//         'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
//       });
//     }
//   });

   
export default function FormTabs() {
    // useEffect(() => {
    //     window.jQuery = require('../public/jquery-latest.min');
    //     window.Diamonds = require('../public/jquery.diamonds.js');

    //     window.jQuery("#demo").diamonds({
    //         size : 100, // Size of diamonds in pixels. Both width and height.
    //         gap : 5, // Pixels between each square.
    //         hideIncompleteRow : false, // Hide last row if there are not enough items to fill it completely.
    //         autoRedraw : true, // Auto redraw diamonds when it detects resizing.
    //         itemSelector : `.${styles.item}` // the css selector to use to select diamonds-items.
    //     });
    // }, []);
  return (
    <div className="wizard-navigation">
        <ul className="nav nav-pills">
            <li><a href="#welcome" data-toggle="tab">Welcome</a></li>
            <li><a href="#registration" data-toggle="tab">Registration</a></li>
            <li><a href="#classification" data-toggle="tab">Type</a></li>
            <li><a href="#payment" data-toggle="tab">Payment</a></li>
            <li><a href="#thankyou" data-toggle="tab">Thank You</a></li>
        </ul>
</div>
  );
}
