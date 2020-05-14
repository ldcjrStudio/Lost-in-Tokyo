const Highlight = ({ color, children }) => (
  <span className={`relative highlight highlight-${color}`}>
    <span className="relative z-2">{children}</span>
  </span>
);

const Intro = () => (
  <div>
    <div className="m-auto-ns f4 f3-m f2-l tc w-80-l normal">
      <Highlight color="aqua">Lost in Tokyo</Highlight> is a directory of fun
      places to see, play in and explore, in{" "}
      <Highlight color="yellow">Tokyo, Japan.</Highlight>
    </div>
    <div className="mb3 mb4-ns">
      From museums and galleries, to Robot Restaurants and{" "}
      <Highlight color="blue">kitten cafes</Highlight>, Tokyo is the gift that
      keeps on giving. Dattebayo!
    </div>
  </div>
);

const NavItem = ({ className, href, children, logo }) => (
  <li className={`mh2-ns f6 f4-1 tc ${className}`}>
    <a className="white no-underline" href={href}>
      {logo ? <img src="images/logo.svg" /> : children}
    </a>
  </li>
);

const Nav = () => (
  <nav className="pt3 pt4-ns mb4 mbo-ns">
    <ul className="list flex flex-wrap flex-nowrap-ns justify-between items-center pa0 ma0">
      {menu.map((item) => (
        <NavItem {...item} />
      ))}
    </ul>
  </nav>
);

const Overlay = ({ showInfo, title, description }) => {
  return (
    <div
      className="absolute w-100 h-100 flex items-center pa3 pa4-ns bg-aqua overlay"
      style={{ transform: showInfo ? "none" : "translateY(-100%)" }}
    >
      <div>
        <h1 className="f4 f3-ns mt0 mb2 regular black normal lh-title">
          {title}
          <br></br>
        </h1>
        <p className="lh-title lh-copy-ns mv0 black f6 measure-l">
          {description}
        </p>
      </div>
    </div>
  );
};

class Attractions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showInfo: false };
    this.toggleInfo = this.toggleInfo.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
  }

  toggleInfo() {
    this.setState((prevState, props) => ({
      showInfo: !prevState.showInfo,
    }));
  }
  closeInfo() {
    this.setState({
      showInfo: false,
    });
  }
  render() {
    const { title, description, className, image } = this.props;
    const { showInfo } = this.state;
    return (
      <div
        className={`ph4 ph5-ns ph0-l mb4 mb5-ns w-100 overflow-hidden pointer attraction ${className}`}
        onMouseEnter={this.toggleInfo}
        onMouseLeave={this.closeInfo}
      >
        <div className="relative">
          <Overlay {...this.props} {...this.state} />
          <img src={`images/${image}`} className="db" />
        </div>
      </div>
    );
  }
}

const App = () => (
  <div>
    <div className=" min-vh-100 ph4 flex flex-column">
      <Nav />
      <Intro />
    </div>

    <div className="flex flex-wrap container">
      {attractions.map((attraction) => (
        <Attractions {...attraction} />
      ))}
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
