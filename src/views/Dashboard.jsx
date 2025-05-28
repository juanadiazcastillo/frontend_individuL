import { Container, Card } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container>
      <br />
      <Card style={{ height: 600 }}>
        <iframe
          title="estaditicas"
          width="100%"
          height="100%"
          src="https://app.powerbi.com/view?r=eyJrIjoiMWMxMzczZGItZDQ4YS00MjQxLTk5MjMtNzBhYWNiNjE0ODVjIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9"
          allowFullScreen
        ></iframe>
      </Card>
    </Container>
  );
};

export default Dashboard;