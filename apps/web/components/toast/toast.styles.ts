import css from "styled-jsx/css";

const styles = css`
  [role="alert"] {
    animation: fade 0.2s;
    background-color: var(--theme-secondary);
    border: 1px solid var(--theme-border);
    border-radius: 0.25rem;
    bottom: 5vh;
    padding: 0.5rem 1rem;
    position: fixed;
    right: 10vw;
  }

  @keyframes fade {
    0% {
      bottom: 0vh;
      opacity: 0;
    }
    100% {
      bottom: 5vh;
      opacity: 1;
    }
  }
`;

export default styles;
