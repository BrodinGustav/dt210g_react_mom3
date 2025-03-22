

//Interface om vad som hämtas från backend
export interface BloggPost {
    _id:string;
    title: string,
    description : string,
    createdAt: string,
    author: { 
        _id: string;
        firstName: string;
    }; //Inkluderar bloggskaparens namn
   } 


   