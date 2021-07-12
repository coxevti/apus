import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
:root {
  --title-primary: #282a31;
  --title-secondary: #8d8d8d;
  --white: #ffffff;
	--light: #f0eff3;
	--black: #000000;
	--dark-blue: #1f2029;
	--dark-light: #353746;
	--red: #da2c4d;
	--yellow: #f8ab37;
	--grey: #ecedf3;
}
::selection {
	color: var(--white);
	background-color: var(--black);
}
::-moz-selection {
	color: var(--white);
	background-color: var(--black);
}
/* http://meyerweb.com/eric/tools/css/reset/
v2.0 | 20110126
License: none (public domain)
*/
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
* {
  box-sizing: border-box;
  outline: 0;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body, html, #root {
  background: #f6f7fb;
  color: #332648;
  -webkit-font-smoothing: antialiased;
  line-height: 1;
  height: 100vh;
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
body, input, button {
  font-family: 'Roboto Slab', serif;
  font-size: 16px;
}
h1, h2, h3, h4, h5, h6, strong {
  font-weight: 500;
}
button {
  cursor: pointer;
}
`
