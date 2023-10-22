import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import RBTree "mo:base/RBTree";

actor {

  let shoppingItems = Buffer.Buffer<Text>(3);


  public query func getShoppingItems () : async [Text] {
    return Iter.toArray(shoppingItems.vals());
  };

  public func addItemToList (anItem : Text) : async () {
    shoppingItems.add(anItem);
  };

  public func removeItemFromList (item : Nat) : async () {
    let x = shoppingItems.remove(item);
  }
  
};
