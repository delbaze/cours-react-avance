function Demo(props: any) {
  console.log(props);
  return <div>Demo</div>;
}

export default Demo;

// Props Proxy

// Inheritance inversion

// function withInheritance<P extends object>(Component: React.ComponentType<P>) {
//   return class extends Component {
//     render() {
//       return super.render();
//     }
//   };
// }
