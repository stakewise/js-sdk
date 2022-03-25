const images: Record<'error' | 'success' | 'loading' | 'close' | 'logo', string> = {
  error: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 120 120"><path stroke="#e34b48" stroke-width="8" d="M116 60A56 56 0 1 1 4 60a56 56 0 0 1 112 0Z"/><g fill="#e34b48"><path d="m39.5 73.4 34-34 7 7.1-34 34z"/><path d="m73.5 80.5-34-34 7-7 34 34z"/></g></svg>',
  success: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 120 120"><path stroke="#6cb069" stroke-width="8" d="M116 60A56 56 0 1 1 4 60a56 56 0 0 1 112 0Z"/><g fill="#6cb069"><path d="m47 73.4 34-34 7 7.1-34 34z"/><path d="m54 80.5-21-21 7-7 21 21z"/></g></svg>',
  loading: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 120 120"><mask id="b" fill="#fff"><path d="M0 60a60 60 0 0 1 120 0"/></mask><path fill="url(#a)" d="M60 0v8-8ZM8 60a52 52 0 0 1 15.2-36.8L12 12A68 68 0 0 0-8 60H8Zm15.2-36.8A52 52 0 0 1 60 8V-8a68 68 0 0 0-48 20l11.2 11.2ZM60 8a52 52 0 0 1 36.8 15.2L108 12A68 68 0 0 0 60-8V8Zm36.8 15.2A52 52 0 0 1 112 60h16a68 68 0 0 0-20-48L96.9 23.1Z" mask="url(#b)"/><mask id="d" fill="#fff"><path d="M120 60A60 60 0 1 1 0 60"/></mask><path fill="url(#c)" d="M60 120v-8 8Zm52-60a52 52 0 0 1-15.2 36.8L108 108A68 68 0 0 0 128 60h-16ZM96.8 96.8A52 52 0 0 1 60 112v16a68 68 0 0 0 48-20L96.9 96.9ZM60 112a52 52 0 0 1-36.8-15.2L12 108A68 68 0 0 0 60 128v-16ZM23.2 96.8A52 52 0 0 1 8 60H-8a68 68 0 0 0 20 48l11.2-11.2Z" mask="url(#d)"/><defs><linearGradient id="a" x1="0" x2="120" y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop stop-color="#4387F1" stop-opacity="0"/><stop offset="1" stop-color="#4387F1" stop-opacity=".5"/></linearGradient><linearGradient id="c" x1="0" x2="120" y1="60" y2="60" gradientUnits="userSpaceOnUse"><stop stop-color="#4387F1"/><stop offset="1" stop-color="#4387F1" stop-opacity=".5"/></linearGradient></defs><animateTransform xmlns="http://www.w3.org/2000/svg" from="0 0 0" to="360 0 0" attributeName="transform" type="rotate" repeatCount="indefinite" dur="1300ms"/></svg>',
  close: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 12 12"><path fill="currentColor" fill-rule="evenodd" d="M2.3 1A.9.9 0 001 2.3L4.7 6 1 9.7A.9.9 0 002.3 11L6 7.3 9.7 11A.9.9 0 1011 9.7L7.3 6 11 2.3A.9.9 0 109.7 1L6 4.7 2.3 1z" clip-rule="evenodd"/></svg>',
  logo: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" viewBox="0 0 256 256"><defs><linearGradient id="a" x2="1" gradientTransform="scale(236.85 -236.85) rotate(26.7 10 5.5)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#8175a5"/><stop offset="1" stop-color="#63577f"/></linearGradient><linearGradient id="b" x2="1" gradientTransform="scale(272.83 -272.83) rotate(-55.7 -.7 -4.8)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#655981"/><stop offset=".2" stop-color="#73628c"/><stop offset="1" stop-color="#b3a5da"/></linearGradient><linearGradient id="c" x2="1" gradientTransform="translate(0 2103.6) scale(206.85)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#73628c"/><stop offset=".6" stop-color="#b3a5da"/><stop offset="1" stop-color="#b3a5da"/></linearGradient><linearGradient id="d" x2="1" gradientTransform="scale(240.6 -240.6) rotate(-47.8 -2 -7)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#afa0d8"/><stop offset="1" stop-color="#cec6e6"/></linearGradient><linearGradient id="e" x2="1" gradientTransform="scale(72.066 -72.066) rotate(-71.6 -2.6 -15)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#887bae"/><stop offset="1" stop-color="#796d9b"/></linearGradient><linearGradient id="f" x2="1" gradientTransform="matrix(-107.33 0 0 107.33 1028.1 1103.6)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#afa0d8"/><stop offset="1" stop-color="#887bae"/></linearGradient><linearGradient id="g" x2="1" gradientTransform="scale(104.4 -104.4) rotate(43.5 17.8 7.3)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#afa0d8"/><stop offset="1" stop-color="#cec6e6"/></linearGradient><linearGradient xlink:href="#a" id="C" x2="1" gradientTransform="scale(236.85 -236.85) rotate(26.7 10 5.5)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#b" id="D" x2="1" gradientTransform="scale(272.83 -272.83) rotate(-55.7 -.7 -4.8)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#c" id="E" x2="1" gradientTransform="translate(0 2103.6) scale(206.85)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#d" id="F" x2="1" gradientTransform="scale(240.6 -240.6) rotate(-47.8 -2 -7)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#e" id="G" x2="1" gradientTransform="scale(72.066 -72.066) rotate(-71.6 -2.6 -15)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#f" id="H" x2="1" gradientTransform="matrix(-107.33 0 0 107.33 1028.1 1103.6)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#g" id="I" x2="1" gradientTransform="scale(104.4 -104.4) rotate(43.5 17.8 7.3)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#a" id="v" x2="1" gradientTransform="scale(236.85 -236.85) rotate(26.7 10 5.5)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#b" id="w" x2="1" gradientTransform="scale(272.83 -272.83) rotate(-55.7 -.7 -4.8)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#c" id="x" x2="1" gradientTransform="translate(0 2103.6) scale(206.85)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#d" id="y" x2="1" gradientTransform="scale(240.6 -240.6) rotate(-47.8 -2 -7)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#e" id="z" x2="1" gradientTransform="scale(72.066 -72.066) rotate(-71.6 -2.6 -15)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#f" id="A" x2="1" gradientTransform="matrix(-107.33 0 0 107.33 1028.1 1103.6)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#g" id="B" x2="1" gradientTransform="scale(104.4 -104.4) rotate(43.5 17.8 7.3)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#a" id="h" x2="1" gradientTransform="scale(236.85 -236.85) rotate(26.7 10 5.5)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#b" id="i" x2="1" gradientTransform="scale(272.83 -272.83) rotate(-55.7 -.7 -4.8)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#c" id="j" x2="1" gradientTransform="translate(0 2103.6) scale(206.85)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#d" id="k" x2="1" gradientTransform="scale(240.6 -240.6) rotate(-47.8 -2 -7)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#e" id="l" x2="1" gradientTransform="scale(72.066 -72.066) rotate(-71.6 -2.6 -15)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#f" id="m" x2="1" gradientTransform="matrix(-107.33 0 0 107.33 1028.1 1103.6)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#g" id="n" x2="1" gradientTransform="scale(104.4 -104.4) rotate(43.5 17.8 7.3)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#a" id="o" x2="1" gradientTransform="scale(236.85 -236.85) rotate(26.7 10 5.5)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#b" id="p" x2="1" gradientTransform="scale(272.83 -272.83) rotate(-55.7 -.7 -4.8)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#c" id="q" x2="1" gradientTransform="translate(0 2103.6) scale(206.85)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#d" id="r" x2="1" gradientTransform="scale(240.6 -240.6) rotate(-47.8 -2 -7)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#e" id="s" x2="1" gradientTransform="scale(72.066 -72.066) rotate(-71.6 -2.6 -15)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#f" id="t" x2="1" gradientTransform="matrix(-107.33 0 0 107.33 1028.1 1103.6)" gradientUnits="userSpaceOnUse"/><linearGradient xlink:href="#g" id="u" x2="1" gradientTransform="scale(104.4 -104.4) rotate(43.5 17.8 7.3)" gradientUnits="userSpaceOnUse"/></defs><path fill="url(#h)" d="M1000.2 750 793.1 855.6l207.1 101.5Z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#726691" stroke-miterlimit="10" stroke-width=".05118500000000001" d="m128.1 256-106-54 106-52Z"/><path fill="url(#i)" d="m1000.2 957.1 206.8-102L1000.2 750Z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="url(#j)" stroke-miterlimit="10" stroke-width=".1" d="m0 0 206.8-102L0-207Z" transform="matrix(.51185 0 0 -.51185 128.1 150)"/><path fill="url(#k)" d="m1122.5 1016.8 84.5-161.6-206.8 102z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#b5a7db" stroke-miterlimit="10" stroke-width=".05118500000000001" d="m190.7 119.4 43.2 82.7L128.1 150Z"/><path fill="url(#l)" d="m878 1017.1 122.2-60L793 855.8z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#8073a3" stroke-miterlimit="10" stroke-width=".05118500000000001" d="m65.5 119.3 62.6 30.6-106 52z"/><path fill="url(#m)" d="M1000.2 957.1V1250L878 1017Z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#9688bd" stroke-miterlimit="10" stroke-width=".05118500000000001" d="M128.1 150V0L65.6 119.3Z"/><path fill="url(#n)" d="M1000.2 957.1V1250l122.3-233.2z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#afa0d8" stroke-miterlimit="10" stroke-width=".05118500000000001" d="M128.1 150V0l62.6 119.4Z"/><path fill="url(#o)" d="M1000.2 750 793.1 855.6l207.1 101.5Z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#726691" stroke-miterlimit="10" stroke-width=".05118500000000001" d="m128.1 256-106-54 106-52Z"/><path fill="url(#p)" d="m1000.2 957.1 206.8-102L1000.2 750Z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="url(#q)" stroke-miterlimit="10" stroke-width=".1" d="m0 0 206.8-102L0-207Z" transform="matrix(.51185 0 0 -.51185 128.1 150)"/><path fill="url(#r)" d="m1122.5 1016.8 84.5-161.6-206.8 102z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#b5a7db" stroke-miterlimit="10" stroke-width=".05118500000000001" d="m190.7 119.4 43.2 82.7L128.1 150Z"/><path fill="url(#s)" d="m878 1017.1 122.2-60L793 855.8z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#8073a3" stroke-miterlimit="10" stroke-width=".05118500000000001" d="m65.5 119.3 62.6 30.6-106 52z"/><path fill="url(#t)" d="M1000.2 957.1V1250L878 1017Z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#9688bd" stroke-miterlimit="10" stroke-width=".05118500000000001" d="M128.1 150V0L65.6 119.3Z"/><path fill="url(#u)" d="M1000.2 957.1V1250l122.3-233.2z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#afa0d8" stroke-miterlimit="10" stroke-width=".05118500000000001" d="M128.1 150V0l62.6 119.4Z"/><path fill="url(#v)" d="M1000.2 750 793.1 855.6l207.1 101.5Z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#726691" stroke-miterlimit="10" stroke-width=".05118500000000001" d="m128.1 256-106-54 106-52Z"/><path fill="url(#w)" d="m1000.2 957.1 206.8-102L1000.2 750Z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="url(#x)" stroke-miterlimit="10" stroke-width=".1" d="m0 0 206.8-102L0-207Z" transform="matrix(.51185 0 0 -.51185 128.1 150)"/><path fill="url(#y)" d="m1122.5 1016.8 84.5-161.6-206.8 102z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#b5a7db" stroke-miterlimit="10" stroke-width=".05118500000000001" d="m190.7 119.4 43.2 82.7L128.1 150Z"/><path fill="url(#z)" d="m878 1017.1 122.2-60L793 855.8z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#8073a3" stroke-miterlimit="10" stroke-width=".05118500000000001" d="m65.5 119.3 62.6 30.6-106 52z"/><path fill="url(#A)" d="M1000.2 957.1V1250L878 1017Z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#9688bd" stroke-miterlimit="10" stroke-width=".05118500000000001" d="M128.1 150V0L65.6 119.3Z"/><path fill="url(#B)" d="M1000.2 957.1V1250l122.3-233.2z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#afa0d8" stroke-miterlimit="10" stroke-width=".05118500000000001" d="M128.1 150V0l62.6 119.4Z"/><path fill="url(#C)" d="M1000.2 750 793.1 855.6l207.1 101.5Z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#726691" stroke-miterlimit="10" stroke-width=".05118500000000001" d="m128.1 256-106-54 106-52Z"/><path fill="url(#D)" d="m1000.2 957.1 206.8-102L1000.2 750Z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="url(#E)" stroke-miterlimit="10" stroke-width=".1" d="m0 0 206.8-102L0-207Z" transform="matrix(.51185 0 0 -.51185 128.1 150)"/><path fill="url(#F)" d="m1122.5 1016.8 84.5-161.6-206.8 102z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#b5a7db" stroke-miterlimit="10" stroke-width=".05118500000000001" d="m190.7 119.4 43.2 82.7L128.1 150Z"/><path fill="url(#G)" d="m878 1017.1 122.2-60L793 855.8z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#8073a3" stroke-miterlimit="10" stroke-width=".05118500000000001" d="m65.5 119.3 62.6 30.6-106 52z"/><path fill="url(#H)" d="M1000.2 957.1V1250L878 1017Z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#9688bd" stroke-miterlimit="10" stroke-width=".05118500000000001" d="M128.1 150V0L65.6 119.3Z"/><path fill="url(#I)" d="M1000.2 957.1V1250l122.3-233.2z" transform="matrix(.51185 0 0 -.51185 -383.9 639.9)"/><path fill="none" stroke="#afa0d8" stroke-miterlimit="10" stroke-width=".05118500000000001" d="M128.1 150V0l62.6 119.4Z"/></svg>',
}


export default images