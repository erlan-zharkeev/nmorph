import { nmorphInset } from "@/utils";

export const useCommonStyles = () => {
  const generateCSS = () => `
    .nmorph-scroll::-webkit-scrollbar-track {
      ${nmorphInset()}
    }
    @keyframes slide {
      from {
        left: -50%;
      }

      to {
        left: 100%;
      }
    }
    @keyframes nmorph-skeleton-loading-animation {
      0% {
        background-position: 100% 50%;
      }

      100% {
        background-position: 0 50%;
      }
    }
  `

  const styleElement = document.createElement('style');
  styleElement.innerHTML = generateCSS();
  document.head.appendChild(styleElement);
}
