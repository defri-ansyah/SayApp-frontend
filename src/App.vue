<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
* {
transition: .3s;
box-sizing: border-box;
text-decoration: none;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
margin: 0;
padding: 0;
border: 0;
font-size: 100%;
font: inherit;
vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
display: block;
}
body {
line-height: 1;
}
ol, ul {
list-style: none;
}
blockquote, q {
quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
content: '';
content: none;
}
table {
border-collapse: collapse;
border-spacing: 0;
}
input {
  margin: 0;
  outline: 0;
  padding: 0;
  border: 0;
}
input:focus {
  margin: 0;
  outline: 0;
  padding: 0;
  border: 0;
}
body {
  font-family: 'Rubik';
}
button {
  border: 0;
  outline: 0;
}
button:focus {
  border: 0;
  outline: 0;
}
$primary: #7E98DF;
$dark: #232323;
$gray: #848484;
.box-auth {
  width: 500px;
  height: 710px;
  border-radius: 30px;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  background: #FFFFFF;
  padding: 40px 70px;
  // margin-left: 33%;
}
</style>
