/* @ds-bundle: {"format":4,"namespace":"InstitutoVOSZ","components":[{"name":"Button"},{"name":"Card"},{"name":"Tag"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;

  function cx() {
    return Array.prototype.filter.call(arguments, Boolean).join(' ');
  }

  function Button(props) {
    var variant = props.variant || 'primary';
    var size = props.size || 'md';
    var rest = {};
    for (var k in props) {
      if (['variant', 'size', 'children', 'className', 'href'].indexOf(k) === -1) rest[k] = props[k];
    }
    rest.className = cx('vsz-button', 'vsz-button--' + variant, 'vsz-button--' + size, props.className);
    if (props.href) {
      rest.href = props.href;
      return h('a', rest, props.children);
    }
    if (!rest.type) rest.type = 'button';
    return h('button', rest, props.children);
  }

  function Card(props) {
    var variant = props.variant || 'default';
    return h(
      'article',
      { className: cx('vsz-card', 'vsz-card--' + variant, props.className) },
      props.eyebrow ? h('p', { className: 'vsz-card__eyebrow' }, props.eyebrow) : null,
      props.title ? h('h3', { className: 'vsz-card__title' }, props.title) : null,
      props.children ? h('div', { className: 'vsz-card__body' }, props.children) : null,
      props.footer ? h('div', { className: 'vsz-card__footer' }, props.footer) : null
    );
  }

  function Tag(props) {
    var variant = props.variant || 'roxo';
    return h('span', { className: cx('vsz-tag', 'vsz-tag--' + variant, props.className) }, props.children);
  }

  window.InstitutoVOSZ = { Button: Button, Card: Card, Tag: Tag };
})();
