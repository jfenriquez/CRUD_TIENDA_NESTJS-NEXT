import Spline from "@splinetool/react-spline";
import styled from "styled-components";
const Container = styled.div`
  animation: animate 2s infinite ease alternate;
  width: 140px;
  height: 100px;
  @media only screen and (max-width: 768px) {
    width: 140px;
    height: 140px;
  }
  @keyframes animate {
    to {
      transform: translateY(4px);
    }
  }
`;

export default function ICONO_3D() {
  return (
    <Container>
      <Spline scene="https://prod.spline.design/v-GmXBlSt7-Vxh9B/scene.splinecode" />
    </Container>
  );
}
