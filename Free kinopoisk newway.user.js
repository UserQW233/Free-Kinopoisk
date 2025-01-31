// ==UserScript==
// @name           Free kinopoisk
// @namespace      https://github.com/ecXbe/Free-Kinopoisk
// @version        2077v.1.7/4.newway
// @host           https://raw.githubusercontent.com/ecXbe/Free-Kinopoisk/refs/heads/main
// @source         https://github.com/ecXbe/Free-Kinopoisk
// @supportURL     https://github.com/ecXbe/Free-Kinopoisk
// @updateURL      https://github.com/ecXbe/Free-Kinopoisk/raw/main/Free%20kinopoisk%20newway.user.js
// @downloadURL    https://github.com/ecXbe/Free-Kinopoisk/raw/main/Free%20kinopoisk%20newway.user.js
// @description    Allows you to watch movies/series on kinopoisk.ru for free.
// @description:ru Позволяет вам смотреть фильмы/сериалы на kinopoisk.ru бесплатно.
// @author         ezX {cps};
// @require        http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require        https://raw.githubusercontent.com/ecXbe/Free-Kinopoisk/refs/heads/main/assets/js/update.js
// @include        /^https:\/\/www\.kinopoisk\.ru\/.*$/
// @include        /^https:\/\/.*flicksbar\..*$/
// @include        /^https:\/\/thesaurus\.allohalive\..*$/
// @include        /^https:\/\/.*svetacdn\..*$/
// @include        /^https:\/\/api\..*\.ws\/.*$/
// @include        /^https:\/\/.*kodik\..*$/
// @include        /^https:\/\/.*\.fotpro135alto\.com\/.*$/
// @connect        www.kinopoisk.ru
// @connect        api.github.com
// @connect        raw.githubusercontent.com
// @icon           https://www.google.com/s2/favicons?sz=64&domain=kinopoisk.ru
// @grant          GM_xmlhttpRequest
// @grant          GM_info
// @run-at         document-body
// @compatible	   Chrome
// @compatible	   Edge
// @compatible	   Firefox
// @compatible	   Opera
// @license        CC-BY-SA-4.0
// ==/UserScript==
/* global update_able */

/*
_________        ___.                                     __
\_   ___ \___.__.\_ |__   _________________  __ __  ____ |  | __
/    \  \<   |  | | __ \_/ __ \_  __ \____ \|  |  \/    \|  |/ /
\     \___\___  | | \_\ \  ___/|  | \/  |_> >  |  /   |  \    <
 \______  / ____| |___  /\___  >__|  |   __/|____/|___|  /__|_ \
        \/\/          \/     \/      |__|              \/     \/
                                             _________ __
                                            /   _____//  |_  ____   ___________  ______
                                            \_____  \\   __\/ __ \_/ __ \_  __ \/  ___/
                                            /        \|  | \  ___/\  ___/|  | \/\___ \
                                           /_______  /|__|  \___  >\___  >__|  /____  >
                                                   \/           \/     \/           \/
*/



/*
 _____                                                                _____
( ___ )                                                              ( ___ )
 |   |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|   |
 |   |                                                                |   |
 |   |                                                                |   |
 |   |                    __      __   __      __                     |   |
 |   |        ____   ____/  \    /  \ /  \    /  \_____  ___.__.      |   |
 |   |       /    \_/ __ \   \/\/   / \   \/\/   /\__  \<   |  |      |   |
 |   |      |   |  \  ___/\        /   \        /  / __ \\___  |      |   |
 |   |      |___|  /\___  >\__/\  /     \__/\  /  (____  / ____|      |   |
 |   |           \/     \/      \/           \/        \/\/           |   |
 |   |                                                                |   |
 |   |                                                                |   |
 |___|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|___|
(_____)                                                              (_____)
*/


(function() {
    'use strict';
    const $ = jQuery.noConflict(true);

    function importStyle(filepath) {
        let $host = GM_info.scriptMetaStr.match(/@host\s+([^\n]+)/)?.[1]?.trim();
        let $link = `${$host}/${filepath}`;

        let $head = $('head');
        if (!$head) return;
        GM_xmlhttpRequest({
            method: "GET",
            url: $link,
            onload: function(response) {
                return $('<style>', {type: 'text/css', text: response.responseText}).appendTo($head);
            }
        })
    }

    function addGlobalStyle(css) {
        let $head = $('head');
        if (!$head) return
        return $('<style>', {type: 'text/css', text: css}).appendTo($head);
    }

    const kinopoisk = function() {
        window.addEventListener('load', function() {
            const $oldButton = $('button.kinopoisk-watch-online-button');

            if ($oldButton.length) {
                let $spin = $('<div>', {class: 'spinner', style: 'margin-top: 5px'});

                $oldButton.parent().css({'display': 'flex', 'justify-content': 'center'});

                $oldButton.parent().append($spin)

                $oldButton.css('pointer-events', 'none');
                $oldButton.find('*').each(function() {
                    $(this).css('filter', 'blur(5px)');
                });

                let check_load = setInterval(function() {
                    if (!$('.spinner').length || document.readyState === 'complete') {
                        $spin.remove();
                        setTimeout(function() {
                            let $ConButton = $('button.kinopoisk-watch-online-button').parent();
                            $('button.kinopoisk-watch-online-button').remove();
                            $ConButton.append($('<button>', {html: '<span class="style_iconLeft__Kq1ig" data-tid="53b4357d"><span class="styles_icon__iKaVd" data-tid="6cb8d12f"></span></span><span class="styles_defaultText__PgVb9 undefined" data-tid="6cb8d12f">Смотреть</span>', class: $oldButton.attr('class')}).click(function() {const site = window.location.href.split('kino'); window.location.href = `${site[0]}ss${site[1]}`;}))

                            clearInterval(check_load);
                        }, 10);
                    }
                }, 50);
            } else {
                let $spin = $('<div>', {class: 'spinner', style: 'margin-top: 2px'});

                let $btnLoad = $('<div>', {class: 'styles_button__tQYKG'}).append($('<button>', {class: 'style_button__PNtXT style_buttonSize52__b5OBe style_buttonPrimary__ndPAb style_buttonLight____6ma style_withIconLeft___Myt9', style: 'background: rgba(0,0,0,.10) !important; pointer-events: none;', html: '<span class="style_iconLeft__Kq1ig" data-tid="53b4357d"><span class="styles_icon__iKaVd" data-tid="6cb8d12f" style="filter: blur(5px)"></span></span><span class="styles_defaultText__PgVb9 undefined" data-tid="6cb8d12f" style="filter: blur(5px)">Смотреть</span>'}).append($spin)).prependTo($('div.styles_buttonsContainer__HREZO').length ? $('div.styles_buttonsContainer__HREZO') : $('div.styles_buttonsContainer__r_AHo'));

                let checkLoad = setInterval(function() {
                    if (!$('.spinner').length || document.readyState === 'complete') {
                        $btnLoad.remove();
                        ($('div.styles_buttonsContainer__HREZO').length ? $('div.styles_buttonsContainer__HREZO') : $('div.styles_buttonsContainer__r_AHo')).prepend($('<div>', {class: 'styles_button__tQYKG'}).append($('<button>', {class: 'style_button__PNtXT kinopoisk-watch-online-button styles_watchOnlineButton__ruFtI style_buttonSize52__b5OBe style_buttonPlus__TjQez style_buttonLight____6ma style_withIconLeft___Myt9', html: '<span class="style_iconLeft__Kq1ig" data-tid="53b4357d"><span class="styles_icon__iKaVd" data-tid="6cb8d12f"></span></span><span class="styles_defaultText__PgVb9 undefined" data-tid="6cb8d12f">Смотреть</span>'}).click(function() {const site = window.location.href.split('kino'); window.location.href = `${site[0]}ss${site[1]}`})));
                        clearInterval(checkLoad);
                    }
                }, 50);
            }
        });
    };

    const watching = function() {

        $('body').hide();
        $('title').text(`Кинопоиск.`);

        importStyle('assets/css/watch.css');

        let $remove_ad = setInterval(function() {
            let $ad = $('body').children('div:not([class])').first();
            if ($ad.length) {
                $ad.hide().remove();
                clearInterval($remove_ad);
            }
        }, 10);
        setTimeout(() => clearInterval($remove_ad), 5000);

        document.addEventListener('DOMContentLoaded', function() {

            $('div#TopAdMb:eq(0), div.topAdPad:eq(0), div#tgWrapper:eq(0)').hide().remove();


            $('body').show();

            $('head').append('<link rel="icon" href="https://kinopoisk-ru.clstorage.net/1jl61k131/6c3b11mr2/oyV_OzKp_0NaznH5OZz57SD7x2LyqJdTr3wYd-9BcXe3lxk8jFuIBeHTZKMalF3QZMVSHXwthDxVt3oAmlLOLg_Z-vaTMSMbSsNNhTmp_ZUIjrcCh9zvi2pAcGf7qRQPj3MhiMgbNIgJlwgrJoy48Ii55hEUpPh8XQ6awMqGCuav9VoWQw3fBypWETmhwZHJOALfl6_Aq0O7cPCXCzX447PXMWxMA4Colf94d7qkYFj0wRbZ5LxwuOkKIqwGvmp-kzXyws91gy8ygj0RPQ31vZAOS2cXuNtnk_yMV69dBHsP0_VATO8kPGkHBH9K9LwwAMne1WxoHBTtGpLctr7WEks1FhpvCUuH1qY9wU1JxZ0wckf_67CH38sAANMTGcwfZ9OVjFT7dLgVn7yrphzgfJwxihVwOJAAtcqSmPIy2jIzbTa65wHP49qG_YH1-d0N9HpfSxPEq3sLeJCTh1FMc0tvKdQAc7gowUPwUxIwVNyI_WYBxLQsoL3KFqTSevIekyHWDicNVxOSPp2dsTl1BTDyc8-j0Cd7o0SIewNRYNc_jxWgxKt4jAmfdCcCDPhcnAni1fjkiPzpamKcujIOlntt-gar9Z-XBtrJ4cm9EZmoiudzk8BTxy8U_IvTEYhLy9v5HOAriIRpQ7DbJrhUoJz9Fu3UeBRwSc6GnL7GhoK70YI6M1H7o8LOwaWJPV2VlM7T85ssC6efGEDXd5XoG8fnmSDMc1Qofb_IGz50cOC8iTZ5_GSs2MX6kvS2avq2Qz1yYqvF__tGokH9RbmlWQDif6sTBO8ju3zEmx9teCcbA0G8WJ-sxAnjlF-W5LR84CVSYXyQFKCJutKsDo7GLpNhPsILwc-Tmk5hFQEB7YU8YkvrJ_R_L6dgeBdXSdTjN4fxqMDnuHR5R-BP7gCsvIjJFtXU9JwQpTLqvEKW_sbjIeZ-OykT1wJOXQ0ZCYFFCGZnI_dUfzc_XODzwzHEl6NDQQAYB2A4tQuc90boBHQ0OWZldPgA_PGCwpTOzmq-b0maiusF-yOutk29mS1xSbAOz3_vmAtHSwTwkwMxmM-PixGc7MdsLJEL_JOekIA8uFXOceQ4tJwhrpIs3gaSDlP5Iu5nPUPnJhZVYd1FXWlQ4ncTL1wr66tokEdDVRDrZ-spMJwPhDgF8xArKvxwzHih5lGIqHDQXf7eZELilp5fXapCKzXHw07-te1NVVmxDO73o_egc6fLSDhPw01gnwObdWyA2_x09QvEw-Z8rCygkQbFdDg8_NWigjzSflqCL4W-ykOFE2sOGl09NfkZDZCWT89rGIM_ywQwR0dNbOu7c0UQdPtkKE3n4KtqkEhEjN3aLTwY8MzJYvI0uuJWmjOt9tprkUdDmvrZQTFd3TUwzvcHk3zvv7vYsONzbZCL78NlvIArlAzVt-DbzixUuDzJhn3IyPgk_WrutLpaVvoXcTbGG1XTmy7GwQnFGXUB7LJPtw-Mn6MH4FQr_0lgA2_zCZiAl-gQZfeY8-oAKCgURXItXBDwoPHOFhyOsgJmo0FiEhedwwtWCl0FVR2ZlZTOZ4ff3AMzEwDgaxNBDNO_O-0wjHeAkBW37KvmjEgAAP1ywfCkCNTB7nrUItJubkOxWp4XHSNvuhK1JcWlWe0wYv-Li0R7O48o8GPnWWSDexNBqGQvHKDZz9SDTiDovBTN6nHQLOwQfYqGLHJGhnpvdT5KB0nfr9reKTmpSXn9vBIn7_eII1_HzERbkxXgI7P7gSjga6hMZctoM0r4hFzMuQbFaPgwQN1mEiAOSkb6e80ixpOxB5s-ml35rZUZiaju8yMbdCu7CwTU068JjBu_D-GcmJNozMGXHDNOEDTYkAlaYQisCFTtvla0pk7ehu8plvqfnUdTpsLxpbUx-W3Utp_3O0wPXwtYlIt7mRDnAwcZ1BDjpFDFFzAzBpS8NMz1flFEYJQAcfJauEJ2kpqncY46Z8kDC_a2lTFVAenFPJpf4zv8gx8n7PjHAznEB3_nzQD855RM8ftwA_r8tDgguZp5sOTw0F2yTmx2ToYew72mWpOp3xuKOjm1lRWlbZR-v7-3XK-3m2D4V2fdnE8b5820fO-0pJEPdM_2vOzQ4InGbYjA2JRtYp70ptoucuvBYvI_uavXPia57UUpzW04ehP3nwS_b1fsFCtXpdgrOwvtOMBTpKyFlwArsnTc6AAlipHcCJhE8SZi7Oq2iiqjsZ7Cz1krTzaS7WkJScUBaGor4xvQqz8z0HgDWynUCydL7WTEd5C88eP4Q2IcxIQATTbF9BSULL22DtxaWs6iWzH-jj-RIxd2Ws0ltd0N-VTOp-vbVIcn8_hoH-dpWEvvt52gdBcAoIlbdDtqmMyMFKHGhQyIYLTxFl5MBp6Ost9NEkLPudvncpqR8a2VWZ2cLrd_h7gvL0vcZGerLXAnj9e5ZFADgNT5Y9Rf9vRAtAQxQpX0lHAgNbJWpHKe4i5bdQI2n0Ev74o2La2lASUReK53J6eMKxOnEMwjK8VIR7uHzUjsnwQIyZsIzwZ4bDAUdU4NzDTogP1ypsgCEsL2Jy32ike9l2MCmunN0cWFHWC-NyvzdAsnS-x0m_u5lHfPy5VImJ_o0B0fXKd-4EzIsPWKATiMgFTtsiaoVsryQpMNVm5DDYeDNrbdpUG9-eWA8jOHL7jjH1fU6F_r7YRv92MVmJALUHBh-4C7Kjz4BAytQpkEKPj4xcJCxErmWp4b9b5uO9l7owJ2OQ0ZrU3FaBI39x98H_9zbMijxx18W8dbLeRAD7SY-c9c_yLsSMzkUVppBPDYCOluCkByTv62S23Wtot9y9M-CiWFXYXVGWS6twuv8KPH_9gAK08ZCCfHv6mICMv0EFVvXJvm_Dzs7CXSWXhonEgJjopcssraqjMF_vqLGd8Tdtoh9YU96Vl8ft-3ByBz309w1NPjIZRbI_vxVGhDiESJk_BTkrDcIDgNPvVgtByM3WIA/projector-favicon/favicon-16.svg" type="image/svg+xml">');
            let $Video_pleer = $('div.wrapper').css('width', '70%').wrap('<div style="display: flex; align-items: center"></div>').parent();
            $Video_pleer.css('display', 'none'); $Video_pleer.addClass('VideoPleer');
            $('body').append('<div class="spinner"></div>');
            let $parse_link = 'https://www.kinopoisk.ru'+window.location.pathname;

            GM_xmlhttpRequest({
                method: "GET",
                url: $parse_link,
                headers: {
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                    "Accept-Encoding": "gzip, deflate, br, zstd",
                    "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
                    "Connection": "keep-alive",
                    "DNT": "1",
                    "Host": "www.kinopoisk.ru",
                    "Priority": "u=0, i",
                    "Referer": "https://sso.kinopoisk.ru/",
                    "Sec-Fetch-Dest": "document",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-Site": "same-site",
                    "Sec-Fetch-User": "?1",
                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0"
                },
                onload: function(response) {
                    if (response.finalUrl !== $parse_link && response.finalUrl.match(/\/(\d+)\//)[0] !== $parse_link.match(/\/(\d+)\//)[0]) return loading_handler();

                    let $NameFilm = $(response.responseText).find('h1.styles_title___itJ6.styles_root__QSToS').children().first().text(); if ($NameFilm === '') {$NameFilm = $(response.responseText).find('h1.styles_title__65Zwx.styles_root__l9kHe').children().first().text()}
                    let $alt_name = $(response.responseText).find('span.styles_originalTitle__JaNKM').text();
                    let $url = $(response.responseText).find('img.film-poster').attr('src');

                    let $table = $(response.responseText).find('.styles_root__5PEXQ').parents().eq(1);
                    let $score = $(response.responseText).find('.film-rating-value').children().eq(0).text() !== '–' ? parseFloat($(response.responseText).find('.film-rating-value').children().eq(0).text(), 10) : $(response.responseText).find('.film-rating-value').children().eq(0).text();
                    let $year = $table.children().first().children().eq(1).children().eq(0).text();
                    let $country = $(response.responseText).find('.styles_root__5PEXQ').parent().prev().children().eq(1).text();
                    let $genres = $(response.responseText).find('.styles_root__5PEXQ').children().first().find("a").map(function() {return $(this).text()}).get().join(', ');
                    let $duration = $table.children().last().children().eq(1).children().eq(0).text();
                    let $slogan = $(response.responseText).find('.styles_root__5PEXQ').parent().next().children().eq(1).text();
                    let $description = $(response.responseText).find('.styles_paragraph__wEGPz').text();

                    const snow = function() {
                        let now = new Date();
                        let month = now.getMonth();
                        let date = now.getDate();
                        if (!((month === 11 && date >= 1) || (month === 0 && date <= 10))) return;

                        importStyle('assets/css/winter.css');
                        setTimeout(function() {
                            let $crds = []; let $lftrght = []; let $x_mv = []; let $snowflake = [];
                            let $h_site = $('body').height(); let $w_site = $(document).width();
                            let $snowcolor = ["#b9dff5", "#7fc7ff", "#7fb1ff", "#7fc7ff", "#b9dff5"];
                            $('body').prepend($('<snowfall>'))

                            for (let i=0; i<=30; i++) {
                                $crds[i] = 0;
                                $lftrght[i] = Math.random()*15;
                                $x_mv[i] = 0.03 + Math.random()/10;

                                $snowflake[i] = {};
                                $snowflake[i].size = Math.floor(Math.random() * (40 - 15 + 1)) + 15;
                                $snowflake[i].fall = $snowflake[i].size * 0.9 / 5;
                                $snowflake[i].posx = Math.floor(Math.random() * ($w_site-$snowflake[i].size));
                                $snowflake[i].posy = Math.floor(Math.random() * (2*$h_site-$h_site-2*$snowflake[i].size));

                                $('snowfall').append($('<span>', {text: '❄', id: `s${i}`, style: `font-size: ${$snowflake[i].size}px; color: ${$snowcolor[Math.floor(Math.random() * $snowcolor.length)]}; left: ${$snowflake[i].posx}px; top: ${$snowflake[i].posy}px`}));
                            }

                            setInterval(function() {
                                for (let i=0; i<=30; i++) {
                                    $crds[i] += $x_mv[i];
                                    $('.watch').length ? $snowflake[i].posy += $snowflake[i].size * 0.1 / 5 : $snowflake[i].posy += $snowflake[i].fall;

                                    $(`#s${i}`).css({'left': `${$snowflake[i].posx + $lftrght[i] * Math.sin($crds[i])}px`, 'top': `${$snowflake[i].posy}px`});

                                    if ($snowflake[i].posy >= $h_site + 2 * $snowflake[i].size || parseInt($(`#s${i}`)) > ($w_site - 3 * $lftrght[i])){
                                        $snowflake[i].posx = Math.floor(Math.random() * $w_site - $snowflake[i].size)
                                        $snowflake[i].posy = 0
                                    }
                                }
                            }, 50)
                        }, 2000)
                    }
                    
                    const update = function() {

                        let $host = GM_info.scriptMetaStr.match(/@host\s+([^\n]+)/)?.[1]?.trim();
                        let $branch = GM_info.script.version.includes('newway') ? 'Free%20kinopoisk%20newway.user.js' : 'Free%20kinopoisk.user.js';
                    
                        GM_xmlhttpRequest({
                            method: "GET",
                            url: `${$host}/config.json`,
                            onload: function(response) {
                    
                                let $current_version = GM_info.script.version;
                                let $last_version = JSON.parse(response.responseText).version.newway;

                                if (update_able($current_version, $last_version) === 0) return;


                                $('ui').prepend($('<update>', {style: 'display: none'}).append(
                                    $('<div>').append(
                                        $('<div>', {class: 'update_menu'}).append(
                                            $('<h2>', {class: 'update_head', text: 'Доступно обновление'})
                                        ).append(
                                            $('<div>', {class: 'update_info'}).append(
                                                $('<span>', {text: $last_version, class: 'version_update'})
                                            ).append(
                                                $('<div>', {class: 'update_list'})
                                            )
                                        ).append(
                                            $('<div>', {class: 'update_buttons'}).append(
                                                $('<span>', {class: 'update_later', text: 'Не сейчас'}).click(function() {$('update').remove(); $('section, info').css('pointer-events', '');})
                                            ).append(
                                                $('<button>', {class: 'update_now', text: 'Обновить'}).click(function() {
                                                    window.location.href = `https://github.com/ecXbe/Free-Kinopoisk/raw/main/${$branch}`;
                                                    setTimeout(function() {
                                                        $('.update_buttons, .version_update').remove();
                                                        $('.update_head').text('Вы обновились!');
                                                        $('.update_list').empty().append($('<p>', {class: 'innovation', text: 'Чтобы изменения вступили в силу, перезагрузите страницу'}));
                                                    }, 1000);
                                                })
                                            )
                                        )
                                    )
                                ));

                                GM_xmlhttpRequest({
                                    method: "GET",
                                    url: `https://api.github.com/repos/ecXbe/Free-Kinopoisk/commits?path=${$branch}`,
                                    onload: function(response) {
                                        let $commit_match = GM_info.script.version.includes('newway') ? 'v2077v(\\.\\d+)+[^; ]*' : 'v2077v(\\.\\d+)+';
                    
                                        let $current_version = GM_info.script.version;
                                        let $versions = JSON.parse(response.responseText).map(s => {
                                            let $commits = s.commit.message.split('\n\n')[0].match($commit_match);
                                            return $commits ? $commits[0] : null;
                                        }).filter(Boolean);
                                        for (let i in $versions) {
                                            if (update_able($current_version, $versions[i]) === 0) {
                                                if (i == 1) {$('span.version_highlighting').remove();}
                                                break;
                                            } else if ($versions[i] !== $versions[i-1]) {
                                                $('.update_list').append($('<span>', {class: 'version_highlighting', text: $versions[i]}));
                                                let $lastCommit = JSON.parse(response.responseText)[i].commit.message;
                                                let $lines = $lastCommit.split('\n\n').slice(1).join('\n').split(/\r?\n/);

                                                for (let i = 0; i < $lines.length; i++) {
                                                    if ($lines[i] === '--RU--') {
                                                        $('.update_list').append($('<span>', {class: 'highlighting'}));
                                                    } else {
                                                        $('.update_list').append($('<p>', {text: $lines[i], class: 'innovation'}))
                                                    }
                                                }
                                            }
                                        }

                                        $('update').css('display', '');
                                        $('section, info').css('pointer-events', 'none');
                                    }
                                });
                            }
                        });
                    }

                    watching_initialization(false, $NameFilm, $alt_name, $url, $score, $year, $country, $genres, $duration, $slogan, $description);
                    snow();
                    update();
                },
                onerror: function(response) {
                    loading_handler();
                }
            })
        });
    };

    const loading_handler = function() {
        $('body').append(
            $('<div>', {class: 'loading_alert', html: '<span>Похоже возникла проблема.</span><span class="reload_page_btn">Обновите</span><span>страницу или включите</span><span class="offline_mode_btn">Автономный режим</a>'})
        )
        $('.reload_page_btn').click(function() {
            window.location.reload();
        });
        $('.offline_mode_btn').click(function() {
            watching_initialization(true);
        });
    }

    const watching_initialization = function($offline, $NameFilm='', $alt_name='', $url='', $score='', $year='', $country='', $genres='', $duration='', $slogan='', $description='') {
        let $Video_pleer = $('div.VideoPleer');

        $('title').text(`Кинопоиск. ${$NameFilm}`);
        let $section = $('<section>').append(
            $('<div>', {class: 'united_el'}).append(
                $('<div>').append(
                    $('<div>').append(
                        $('<header>', {class: 'NameFilm_head'}).append(
                            $('<h2>').append(
                                $('<div>').append(
                                    $('<div>', {class: 'header_container'}).append(
                                        $('<i>', {class: 'back-arrow', title: 'Назад', draggable: 'false'}).click(function() {window.location.host = 'www.kinopoisk.ru'})
                                    ).append(
                                        $('<img>', {class: 'header_homepage', src: 'https://avatars.mds.yandex.net/get-bunker/120922/4a5dd24b637255a8fc5190bb353ef60c21018288/orig', title: 'Главная', draggable: 'false'}).click(function() {window.location.href = 'https://www.kinopoisk.ru'})
                                    )
                                ).append(
                                    $('<div>', {class: 'NameFilm'}).append($alt_name == 0 ? $NameFilm : `${$NameFilm} / ${$alt_name}`)
                                )
                            )
                        )
                    ).append($Video_pleer)
                )
            )
        )
        if ($offline === false) {

            $('<info>', {style: 'display: none'}).append(
                $('<div>', {class: 'info_container'}).append(
                    $('<pre_info>').append(
                        $('<div>', {class: 'pre_info_arrow', title: 'Прокрутите вверх для возвращения обратно'}).append(
                            $('<div>', {class: 'half_arrow first_half_up'})
                        ).append(
                            $('<div>', {class: 'half_arrow second_half_up'})
                        ).click(function() {
                            $('ui').css('transform', '');
                            $(this).css('pointer-events', 'none');
                            setTimeout(() => $(this).css('pointer-events', ''), 50);
                        })
                    )).append(
                    $('<div>', {class: 'information'})
                )
            ).appendTo($('body'));

            $section.append(
                $('<pre_info>', {style: 'display: none;'}).append(
                    $('<div>', {class: 'pre_info_arrow', title: 'Прокрутите вниз для подробной информации'}).append(
                        $('<div>', {class: 'half_arrow first_half'})
                    ).append(
                        $('<div>', {class: 'half_arrow second_half'})
                    ).click(function() {
                        if ($('.watch').length) {
                            $('i.watch_mode').removeClass('watch_active');
                            $('.poster, .kinobox__menu, .united_el, .VideoPleer, .pre_info_arrow, .half_arrow').removeClass('watch');
                            setTimeout(function() {
                                $('ui').css('transform', 'translateY(-65.8%)');
                                $(this).css('pointer-events', 'none');
                                setTimeout(() => $(this).css('pointer-events', ''), 50);
                            }, 250);
                        } else {
                            $('ui').css('transform', 'translateY(-65.8%)');
                            $(this).css('pointer-events', 'none');
                            setTimeout(() => $(this).css('pointer-events', ''), 50);
                        }
                    })
                )
            )

            $Video_pleer.append(
                $('<div>').append(
                    $('<img>', {class: 'poster', src: $url, draggable: 'false'})
                )
            ).append(
                $('<div>', {class: 'watch_mode_container'}).append(
                    $('<i>', {class: 'watch_mode'}).click(function() {if ($('ui').css('transform') === 'none') {$(this).toggleClass('watch_active'); $('.poster, .kinobox__menu, .united_el, .VideoPleer, .pre_info_arrow, .half_arrow').toggleClass('watch');}})
                )
            );

            $('.information').append(
                $('<div>').append(
                    $('<div>').append(
                        $('<img>', {src: $url, draggable: 'false'})
                    )
                ).append(
                    $('<div>', {class: 'information_text'}).append(
                        $('<h2>').append(
                            'Информация'
                        ).append(
                            $('<div>', {class: 'rating_container'}).append(
                                $('<div>', {class: 'star_container'}).append(
                                    $('<div>', {class: 'star-line'}).append(
                                        $('<div>', {class: 'star'})
                                    ).append(
                                        $('<div>', {class: 'star'})
                                    ).append(
                                        $('<div>', {class: 'star'})
                                    ).append(
                                        $('<div>', {class: 'star'})
                                    ).append(
                                        $('<div>', {class: 'star'})
                                    )
                                ).append(
                                    $('<div>', {class: 'star_score', text: $score})
                                )
                            ).append(
                                $('<div>', {class: 'rating_text', text: 'Рейтинг'})
                            )
                        )
                    ).append(
                        $('<div>', {class: 'about'}).append(
                            $('<div>', {class: 'head_some-info'}).append(
                                $('<div>', {class: 'title_some-info', text: 'Год'})
                            ).append(
                                $('<div>', {class: 'some-info', text: $year})
                            )
                        ).append(
                            $('<div>', {class: 'head_some-info'}).append(
                                $('<div>', {class: 'title_some-info', text: 'Страна'})
                            ).append(
                                $('<div>', {class: 'some-info', text: $country})
                            )
                        ).append(
                            $('<div>', {class: 'head_some-info'}).append(
                                $('<div>', {class: 'title_some-info', text: 'Жанры'})
                            ).append(
                                $('<div>', {class: 'some-info', text: $genres})
                            )
                        ).append(
                            $('<div>', {class: 'head_some-info'}).append(
                                $('<div>', {class: 'title_some-info', text: 'Время'})
                            ).append(
                                $('<div>', {class: 'some-info', text: $duration})
                            )
                        )
                    ).append(
                        $('<div>', {class: 'citation', text: $slogan})
                    ).append(
                        $('<div>', {class: 'description', text: $description})
                    )
                )
            );
            let $stars = Math.round($score / 2);
            for (let i=1; i<=$stars; i++) {$('.star').filter(':not(.active-star)').eq(0).addClass('active-star')}

            window.addEventListener("wheel", function(event) {
                if (event.deltaY > 0 && !$('update').length) {
                    if ($('.watch').length) $('i.watch_mode').removeClass('watch_active'); $('.poster, .kinobox__menu, .united_el, .VideoPleer, .pre_info_arrow, .half_arrow').removeClass('watch');
                    setTimeout(() => {$('ui').css('transform', 'translateY(-65.8%)')});
                } else if (event.deltaY < 0) {
                    $('ui').css('transform', '');
                }
            });
        } else if ($offline === true) {
            $Video_pleer.css({'margin-bottom': '40px', 'justify-content': 'center'});
            $Video_pleer.find('.wrapper').eq(0).css('width', '85%');
            $('.loading_alert').remove();
        }

        $section.appendTo($('body'))


        $(document).keyup(function(e) {
            if (e.key === 'Escape') {
                $('i.watch_mode').removeClass('watch_active');
                $('.poster, .kinobox__menu, .united_el, .VideoPleer, .pre_info_arrow, .half_arrow').removeClass('watch');
            }
        })

        $('.spinner').remove();
        $('<ui>').append($('section')).append($('info')).appendTo($('body'));
        $Video_pleer.css('display', 'flex');$('info').css('display', 'flex');$('pre_info').css('display', 'flex');
    }

    if (window.location.host === 'www.kinopoisk.ru') {
        addGlobalStyle(`@keyframes spinner {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}} @-webkit-keyframes spinner {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}} .spinner {display: block;position: absolute;transform: translate(-50%, -50%);width: 30px;height: 30px;border-radius: 50%;border: 4px solid rgba(0, 0, 0, 0.1);border-width: 6px;border-top-color: #b5b5b5;animation: spinner 0.6s linear infinite;} font[size='70'] {font: 25px normal tahoma, verdana, arial, sans-serif;}`)
        document.addEventListener('DOMContentLoaded', function() {
            $('body').on('mousedown', 'a[href]:not([href*="?"]):not([target="_blank"])', function() {
                $(this).off();
                let url = $(this).attr('href');
                window.location.href = url;
            });
            setInterval(function() {
                $("a[href*='/watch/']").filter(':not(.processed):not(:contains("Смотреть"))').each(function() {
                    $(this).attr('href', $(this).attr('href').replace(/\/watch\/.*/, ''));
                    $(this).addClass('processed');
                });
                $('li[role="listitem"]:not(.processed)').each(function() {
                    let $item = $(this).find('a:eq(0)');
                    let $type = $item.attr('id').includes("tvSeries") ? 'series' : $item.attr('id').includes("film") ? 'film' : '';
                    $item.attr('href', `https://kinopoisk.ru/${$type}/${$item.attr('id').replace(/[^0-9]/g, '')}`);
                    return $(this).addClass('processed');
                })
            }, 200);
        });
        if (!window.location.pathname.includes('/film') && !window.location.pathname.includes('/series')) {
            document.addEventListener('DOMContentLoaded', function() {
                setInterval(function() {
                    $('a:not(.processed)').each(function() {
                        if ($(this).text().trim() === "Смотреть") {
                            let $spin = $('<div>', {class: 'spinner', style: `margin: 1px 0 0 ${($(this).outerWidth()-90.98)/4.668}px; width: ${$(this).outerHeight()/52*30}px; height: ${$(this).outerHeight()/52*30}px; border-width: ${Math.ceil($(this).outerHeight()/52*30/5)}px;`});
                            let $old = $(this);
                            $old.addClass('processed');

                            $old.css('pointer-events', 'none');
                            $old.contents().filter(function() {
                                return this.nodeType === 3;
                            }).wrap("<span></span>");
                            $old.find('*').css('filter', 'blur(5px)');

                            $old.append($spin);
                            let $check_load = setInterval(function() {
                                if (!$('.spinner').length || document.readyState === 'complete') {
                                    let $new_link = $old.parents().eq(4).find('a[href*="/film/"], a[href*="/series/"]').eq(0).attr('href').split('/');
                                    let $index = $new_link.findIndex(part => part === 'film' || part === 'series');
                                    clearInterval($check_load);
                                    $spin.remove();
                                    setTimeout(function() {
                                        $old.attr('href', `https://sspoisk.ru/${$new_link[$index]}/${$new_link[$index+1]}/`).find('*').css('filter', '').end().css('pointer-events', 'unset');
                                    }, 10);
                                }
                            }, 50);
                        }
                    });
                });
            });
        } else {
            kinopoisk();
        }
    } else if (window.location.host.includes('flicksbar') && !(window.location.pathname.includes('kinobox/'))) {
        $('title').text(`Кинопоиск.`);
        watching();
    } else {
        GM_xmlhttpRequest({
            method: "GET",
            url: 'https://raw.githubusercontent.com/AdguardTeam/FiltersRegistry/master/filters/filter_15_DnsFilter/filter.txt',
            onload: function(response) {

                let $lines = response.responseText.split('\r\n');
                let $filters = [];

                for (let i = 0; i < $lines.length; i++) {
                    let $line = $lines[i];
                    if ($line.startsWith('||')) {
                        $line = $line.substring(2);
                        if ($line.endsWith('^')) $line = $line.slice(0, -1);
                        $filters.push($line);
                    }
                }

                const originalOpen = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function (method, url) {
                    for (const domain of $filters) {
                        if (url.includes(domain)) {
                            this.abort();
                            return;
                        }
                    }
                    originalOpen.apply(this, arguments);
                };
            }});
    }
})();