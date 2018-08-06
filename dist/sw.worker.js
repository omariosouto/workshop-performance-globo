/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/assets/css/base-181543cb23.css","181543cb233abdc8c9bfdb01a796d0e0"],["/assets/css/block-buttons-2ecc7d7045.css","2ecc7d704521f976a5fd25f822fb9b75"],["/assets/css/block-categoriaCard-4bad1c4cb2.css","4bad1c4cb2aa2464da25c2a0e9a2c6ba"],["/assets/css/block-conteudo-9be6e80ca1.css","9be6e80ca105fd15abb81a1c19ae24b0"],["/assets/css/block-cursoCard-6cef42515e.css","6cef42515ee0768be5949b7b52a1d0a5"],["/assets/css/block-depoimentos-25ad1aa394.css","25ad1aa394bc5f888e2a757a42016214"],["/assets/css/block-elasticMedia-fedac88285.css","fedac88285ab66e4c4882ec20db91975"],["/assets/css/block-footer-7fb9711061.css","7fb9711061ec6443d7c93a25902e55df"],["/assets/css/block-footer-listaCursos-a6494ebc20.css","a6494ebc2068748cfebcb8fd11aee52b"],["/assets/css/block-form-erro-d8e82ebd89.css","d8e82ebd89b22176aaa31692b239bb19"],["/assets/css/block-grupoCaelum-307a6f0779.css","307a6f0779bb900fe98c297426da6e8c"],["/assets/css/block-header-988b537877.css","988b537877f8d72e8c5f6b2b547c10fc"],["/assets/css/block-header-busca-6ca3c98a5c.css","6ca3c98a5c0d5c310b27f79f1f4bb78c"],["/assets/css/block-highlighted-d471066ffd.css","d471066ffde8d23a29989c6edef9fdfd"],["/assets/css/block-painelPlanos-b4f45d3e29.css","b4f45d3e292f44f442d0182e329f3613"],["/assets/css/block-titulo-destaque-d4da51ed1b.css","d4da51ed1b03429601c70a266b88adab"],["/assets/css/block-titulos-edfeab9c31.css","edfeab9c314f3aebac3e37322e07a9be"],["/assets/css/colors-ea5369db7e.css","ea5369db7e9374d879af8affa1282d76"],["/assets/css/font-e5dbf30eae.css","e5dbf30eae649d2c725027c39068b587"],["/assets/css/home-aprenda-a1fe6ac7f9.css","a1fe6ac7f9ff6a1074713f380865d79b"],["/assets/css/home-cad4a5c033.css","cad4a5c033137d60a049e3d373402834"],["/assets/css/home-diferenciais-0cdef7b28d.css","da4c6e4f76057ec5f1a9bfb53cf8cfba"],["/assets/css/home-fundo-fbd5ac06e7.css","0816cee26799d88471845d9d578f8876"],["/assets/css/reset-6b8776077a.css","6b8776077a2bb9c01bb2a44ca3b2fdd3"],["/assets/css/style-ff7879dd3d.css","977f3ce09e62cb9ef14b79055c577610"],["/assets/font/opensans/opensans-bold.ttf","e7b7bc4c7ea85c8ee741e57345c88406"],["/assets/font/opensans/opensans-bold.woff","6b052a415cba02836c8412971a23d42c"],["/assets/font/opensans/opensans-bold.woff2","8c8d8d2d4a8dae43532e2a8070cd4e33"],["/assets/font/opensans/opensans-bolditalic.ttf","fb475ce96477d52bda75954ee4e7229a"],["/assets/font/opensans/opensans-bolditalic.woff","bf13974aa26db33726d2e6099c22cd94"],["/assets/font/opensans/opensans-bolditalic.woff2","b4ffabada3e1da0865ab27ba2c177a36"],["/assets/font/opensans/opensans-extrabold.ttf","84af2cffd7bb334202743ac0cc3daae0"],["/assets/font/opensans/opensans-extrabold.woff","48e2d991700402dad4c9975d4a0e7c4b"],["/assets/font/opensans/opensans-extrabold.woff2","65665ca20034a65e8dd2fbe5448d3903"],["/assets/font/opensans/opensans-extrabolditalic.ttf","93607506c57524506a3a3e8b507f61f2"],["/assets/font/opensans/opensans-extrabolditalic.woff","585f4e39de2123bfe07b3671f7efeef2"],["/assets/font/opensans/opensans-extrabolditalic.woff2","492bb3b0d7d5a77a7b7a2c295c610b33"],["/assets/font/opensans/opensans-italic.ttf","26020dc18b16d3774bb91c9828edf34b"],["/assets/font/opensans/opensans-italic.woff","64ba8cb48c140cf2bd06a19f4c1b411b"],["/assets/font/opensans/opensans-italic.woff2","418bda298bdccc81e71da130f7d59d5e"],["/assets/font/opensans/opensans-light.ttf","570c2dec59c560f9c3e39fe1014d59d5"],["/assets/font/opensans/opensans-light.woff","515f2af824b9efc0136f05e897b63f12"],["/assets/font/opensans/opensans-light.woff2","440cabd5f28a3c5d1a42189065e42423"],["/assets/font/opensans/opensans-lightitalic.ttf","9dc96aa3957c20a7446bb14fa57d43f2"],["/assets/font/opensans/opensans-lightitalic.woff","ce31f9303354166256dad1848767dc73"],["/assets/font/opensans/opensans-lightitalic.woff2","61252db508f6d33008b1349d85da74fd"],["/assets/font/opensans/opensans-regular.ttf","f5b3f5f0b371e79204ed371d022845e2"],["/assets/font/opensans/opensans-regular.woff","d4e5ba264001400b9a4ea46786f6184f"],["/assets/font/opensans/opensans-regular.woff2","0b75afd427d5d0d1a4545b4a620ca028"],["/assets/font/opensans/opensans-semibold.ttf","61c086862f3590e2ee23123f12bf54db"],["/assets/font/opensans/opensans-semibold.woff","c330307dc29120ce49c046fd77f5561d"],["/assets/font/opensans/opensans-semibold.woff2","93d823ff1fabf8d46571bebe603267da"],["/assets/font/opensans/opensans-semibolditalic.ttf","7d06fe501f2b819ddc03d67389ff9309"],["/assets/font/opensans/opensans-semibolditalic.woff","22889e8ff1422d90c00b045195339d9d"],["/assets/font/opensans/opensans-semibolditalic.woff2","7cbb0e98d6481635ba6b13e72e9972dc"],["/assets/img/aluno-adriano-antiga-70ee2b5a73.jpeg","70ee2b5a731b3bf2177b3510c95deda0"],["/assets/img/aluno-adriano-c0f5d573c8.jpeg","c0f5d573c855552a5c4d66481d3e9b07"],["/assets/img/aluno-nico-6e1350d2fb.jpeg","6e1350d2fb3e3748e4049b20ab283954"],["/assets/img/aluno-nico-antiga-6327f393ae.jpeg","6327f393aea421a7f666b11080670d90"],["/assets/img/aluno-sergio-antiga-89c4f0d58c.jpeg","89c4f0d58c2b72c6eea31648b342eac5"],["/assets/img/aluno-sergio-e11bb14d08.jpeg","e11bb14d084ac77a9f5f090bbbab66e8"],["/assets/img/background-cidade-drone-262e76599a.svg","262e76599ad475004e8346f87d5b237f"],["/assets/img/background-cidade-fundo-5d20ac8d24.svg","5d20ac8d2457edaca8cb732105317105"],["/assets/img/background-cidade-nuvem-c4cb868c3d.svg","c4cb868c3d00def0957b564f5a636e45"],["/assets/img/background-cidade-nuvem-grande-9bfd722213.svg","9bfd722213e5dd590308300ea8129bd7"],["/assets/img/busca-74726576a1.svg","74726576a12658f26bb0626d33e7724f"],["/assets/img/categoria-business-4310cba739.svg","4310cba739735c1cb838058f926991ed"],["/assets/img/categoria-design-ux-dcb6a211fd.svg","dcb6a211fdd45cefa8a3da7cd3beafe6"],["/assets/img/categoria-front-end-6a308666e4.svg","6a308666e480502e30dcdc7ba484dd33"],["/assets/img/categoria-infraestrutura-72b35661c1.svg","72b35661c12c5f873a123c474dc37d59"],["/assets/img/categoria-mobile-076c62b9fa.svg","076c62b9fad2da9cde5d137ff8c5fa43"],["/assets/img/categoria-programacao-447bbd5db4.svg","447bbd5db402c5072814ebf75d5b60c6"],["/assets/img/categorias-dade113a3a.svg","dade113a3a687b6d6ca03247a1b8f52e"],["/assets/img/curso-android-studio-ii-integracoes-e-recursos-fa6a8e5c21.svg","fa6a8e5c21e7d11812de9dd1e61b23c1"],["/assets/img/curso-angularjs-mvc-1db1babc54.svg","1db1babc54d937c1f940f3beebb97cd6"],["/assets/img/curso-cordova-phonegap-9c57ee754b.svg","9c57ee754bfc91e65c0985a9243173eb"],["/assets/img/curso-design-editorial-2eb5ccd876.svg","2eb5ccd87674e9a24a38fe0afa1c3050"],["/assets/img/curso-fundamentos-http-8bb09a099a.svg","8bb09a099a048efdb8a9a09bc0f7f27d"],["/assets/img/curso-html-e-css-655ee9e2d3.svg","655ee9e2d35449776cd106f21ad3405a"],["/assets/img/curso-ingles-para-entrevistas-8dd10bf4a8.svg","8dd10bf4a8db97cb5113a2f90fbc4806"],["/assets/img/curso-introducao-html-css-7ae9939b5e.svg","7ae9939b5e87dd84d8a6ff841c65a5ac"],["/assets/img/curso-java-e-orientacao-a-objetos-5460b4806e.svg","5460b4806e51e4ffadd81585e85e0117"],["/assets/img/curso-jpa-avancado-5d6b88d683.svg","5d6b88d683b5a0ea4efdbf967bb8f9c6"],["/assets/img/curso-jsf-cdi-6337a2c943.svg","6337a2c943cb89396d62de3c50898008"],["/assets/img/curso-jsf-primefaces-529d0f093f.svg","529d0f093fd5b94ee380665f97d3ebe5"],["/assets/img/curso-logica-de-programacao-45655ad0cf.svg","45655ad0cfccc16d9382ed0170c923bf"],["/assets/img/curso-marketing-digital-canais-nao-pagos-9fedf1d915.svg","9fedf1d915f0756b670c12d667e5c4ea"],["/assets/img/curso-marketing-digital-canais-pagos-491f3c179f.svg","491f3c179f50ea66a4b9c1492270f4d0"],["/assets/img/curso-primeiros-passos-com-java-670554d832.svg","670554d8323b0ac5ce85e146897eec42"],["/assets/img/diferenciais-b28771b36e.png","b28771b36e02a68d54429ee549ee38fa"],["/assets/img/favicon/android-chrome-192x192-7f4f6f7713.png","7f4f6f7713bc117228914f79a46dd73d"],["/assets/img/favicon/android-chrome-384x384-bb045f6551.png","bb045f65517f744662ac615424d106ac"],["/assets/img/favicon/apple-touch-icon-6384745021.png","63847450219d06b3f718a5a1c87af0e1"],["/assets/img/favicon/favicon-16x16-0230000b9a.png","0230000b9ac589af5ebf34e0606a1e34"],["/assets/img/favicon/favicon-32x32-d70dd12088.png","d70dd12088918e82a51bc3c8471e5cf5"],["/assets/img/favicon/mstile-150x150-2b178917a7.png","2b178917a7bce7b64cae2077c8b0a89d"],["/assets/img/favicon/safari-pinned-tab-bc3cef05d1.svg","bc3cef05d1366465f7d79b1e29b9ce76"],["/assets/img/icon-diferencial-1-8a04a4bfaf.png","8a04a4bfaff0cc88155f8180dd34041f"],["/assets/img/icon-diferencial-1-c61be36b07.svg","c61be36b07a5ac88c38783045e4ed527"],["/assets/img/icon-diferencial-2-30c84cb17f.svg","30c84cb17f58cf92306157ac6c8fdfd4"],["/assets/img/icon-diferencial-2-56a615a674.png","56a615a674b3642b5dc7d3e62430ba08"],["/assets/img/icon-diferencial-3-7a269c81d2.svg","7a269c81d2b08c779f41333614d27437"],["/assets/img/icon-diferencial-3-8c46d1d01f.png","8c46d1d01f5ad9acdac299fccc22bbe4"],["/assets/img/icon-empresa-d1756401e7.svg","d1756401e7f6f2411f61795d962e28c4"],["/assets/img/imagem-gerda-9d9abd025f.png","9d9abd025f55c72ef826f2b634f26566"],["/assets/img/logo-alura-0af2849faf.svg","0af2849faf7efe10656c00daf6c99394"],["/assets/img/logo-caelum-5b1cdc16af.svg","5b1cdc16afc99491d617f40ad54768a1"],["/assets/img/logo-cdc-211a895267.svg","211a895267ac7970d91405d51d8b0239"],["/assets/img/logo-cdc-cinza-0751a87308.svg","0751a873086ac24cf567def0611b4a46"],["/assets/img/logo-galandra-cinza-d1e0db8a6d.svg","d1e0db8a6d5887630af4a0abb91bd903"],["/assets/img/logo-guj-3f08f7e662.svg","3f08f7e662c3274374f42786131a0d80"],["/assets/img/plano-24h-9b70ed1d91.svg","9b70ed1d91b5ec7989f201d0041bffa6"],["/assets/img/plano-acesso-54eddaca76.svg","54eddaca764c773668263380a0e1a77e"],["/assets/img/plano-barra-aulas-87ea2050c6.svg","87ea2050c6186d4200b457334c3dc65e"],["/assets/img/plano-barra-cursos-18ca9a216d.svg","18ca9a216d457adec22e19f6dbcb1b96"],["/assets/img/plano-barra-exercicios-64caa3a928.svg","64caa3a928916113112415fc52e5b193"],["/assets/img/plano-certificado-c33bf79045.svg","c33bf79045f34c3c0c4a0506aacd06db"],["/assets/img/plano-checked-30654afbfd.svg","30654afbfdaf4184537b1cc2dfa00a10"],["/assets/img/plano-cursos-8797f37937.svg","8797f37937bd1005f431e4f4641e97f2"],["/assets/img/plano-onda-f0cd407b3d.svg","f0cd407b3db45c2bbfcc24a6192157d2"],["/assets/img/plano-unchecked-e24bb92e5f.svg","e24bb92e5f31f1d9eb11bfe69d3c365b"],["/assets/js/busca-d6165096b9.js","d6165096b9ed580fffd808ae970806e9"],["/assets/js/detect-13f9f0e1ed.js","13f9f0e1edfadf1d0817451e597db380"],["/assets/js/footer-3fad3386f9.js","3fad3386f95ca01076038d3c7b0f8996"],["/assets/js/home-e496892038.js","e4968920382cd4096feed40b5dd6a9b4"],["/assets/js/jquery-1e5d60b9b4.js","1e5d60b9b436bd705147e2068455bda5"],["/assets/js/lazy-loading-0056588f46.js","0056588f46079149855470e6cc065dd1"],["/assets/js/menu-ea0e02c3c1.js","ea0e02c3c1c53a92f2c5b411826b2816"],["/assets/js/scripts-09621f63ef.js","09621f63eff64e3e95807a1b0a590afb"],["/assets/js/svg4everybody-e21f50ae43.js","e21f50ae439f616f086f36ef1b3e4ce1"],["/assets/js/video-3d7b09826a.js","3d7b09826a5ebac280fbdf342c6e037b"],["/index.html","6dfa0dbd6f3d3b23ddae173626f9b61c"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







