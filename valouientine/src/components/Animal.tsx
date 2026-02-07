export default function Animal() {
  return (
    <svg class="art" viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fur" x1="0" x2="1">
          <stop offset="0" stop-color="#f7c7a1" />
          <stop offset="1" stop-color="#f2a97b" />
        </linearGradient>
        <linearGradient id="heart" x1="0" x2="1">
          <stop offset="0" stop-color="#ff4d7d" />
          <stop offset="1" stop-color="#ff1f68" />
        </linearGradient>
      </defs>

      <path
        d="M250 50 C250 33 270 25 282 38
               C294 25 314 33 314 50
               C314 78 282 92 282 106
               C282 92 250 78 250 50Z"
        fill="url(#heart)"
      />
        
      <path d="M110 92 L95 55 L140 78 Z" fill="#f2a97b" />


      <path
        d="M90 120 C90 70 140 40 190 60
               C240 40 290 70 290 120
               C290 180 240 210 190 210
               C140 210 90 180 90 120Z"
        fill="url(#fur)"
      />

      <path d="M270 92 L285 55 L240 78 Z" fill="#f2a97b" />
      

      <circle cx="160" cy="130" r="8" />
      <circle cx="220" cy="130" r="8" />

      <path
        d="M190 144 C186 144 182 148 182 152
               C182 160 190 164 190 170
               C190 164 198 160 198 152
               C198 148 194 144 190 144Z"
        fill="#ff7aa2"
      />
    </svg>
  );
}