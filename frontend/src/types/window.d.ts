// This file is used to declare global types for the LinkedIn tracking script.
// Require tsconfig.json to include this file in the compilation.
// tsconfig.json should have "include": ["src/types/window.d.ts"] or ["types/*.d.ts"]
declare global {
    interface Window {
        _linkedin_data_partner_ids?: string[];
        _linkedin_partner_id?: string;
        lintrk?: (action: 'track', data: { conversion_id: string | number }) => void;
    }
}

export { };
