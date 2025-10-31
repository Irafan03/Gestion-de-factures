class Facture {
   constructor(id,reference,quantite,prixunitaire){
      this.id=id;
      this.reference=reference;
      this.quantite=quantite;
      this.prixunitaire=prixunitaire;
   }
   
   getTotal(){
    return this.quantite*this.prixunitaire;
   }
}