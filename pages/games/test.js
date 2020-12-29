const TestPage = ({test}) => (
    <div>Hello {test}</div>
);

TestPage.getInitialProps = () => ({test: new Date().getTime()});

export default TestPage;
