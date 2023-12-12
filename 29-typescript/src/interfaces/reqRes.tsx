// Generated by https://quicktype.io

// damos las interfaces
export interface ReqResponseListado {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    data:        Usuario[];
    support:     Support;
}

export interface Usuario {
    id:         number;
    email:      string;
    first_name: string;
    last_name:  string;
    avatar:     string;
}

export interface Support {
    url:  string;
    text: string;
}