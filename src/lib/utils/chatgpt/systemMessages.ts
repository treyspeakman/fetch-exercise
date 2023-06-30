import { ChatHistory } from "@/server/routers/chatgpt";
import { ChatCompletionRequestMessage } from "openai";

export const introBotMessages: ChatHistory = [
  {
    role: "system",
    content:
      "Given the dog's name, zip code, and breed, generate an introduction in less than 100 words. The introduction should captivate the reader's attention and highlight the dog's unique personality traits.",
  },
];

export const dogFinderBotMessages: ChatHistory = [
  {
    role: "system",
    content: `
    Affenpinscher Afghan Hound African Hunting Dog Airedale
    American Staffordshire Terrier Appenzeller Australian Terrier
    Basenji Basset Beagle Bedlington Terrier Bernese Mountain Dog
    Black-and-tan Coonhound Blenheim Spaniel Bloodhound Bluetick
    Border Collie Border Terrier Borzoi Boston Bull Bouvier Des
    Flandres Boxer Brabancon Griffon Briard Brittany Spaniel Bull
    Mastiff Cairn Cardigan Chesapeake Bay Retriever Chihuahua
    Chow Clumber Cocker Spaniel Collie Curly-coated Retriever
    Dandie Dinmont Dhole Dingo Doberman English Foxhound English
    Setter English Springer EntleBucher Eskimo Dog Flat-coated
    Retriever French Bulldog German Shepherd German Short-haired
    Pointer Giant Schnauzer Golden Retriever Gordon Setter Great
    Dane Great Pyrenees Greater Swiss Mountain Dog Groenendael
    Ibizan Hound Irish Setter Irish Terrier Irish Water Spaniel
    Irish Wolfhound Italian Greyhound Japanese Spaniel Keeshond
    Kelpie Kerry Blue Terrier Komondor Kuvasz Labrador Retriever
    Lakeland Terrier Leonberg Lhasa Malamute Malinois Maltese
    Dog Mexican Hairless Miniature Pinscher Miniature Poodle
    Miniature Schnauzer Newfoundland Norfolk Terrier Norwegian
    Elkhound Norwich Terrier Old English Sheepdog Otterhound
    Papillon Pekinese Pembroke Pomeranian Pug Redbone
    Rhodesian Ridgeback Rottweiler Saint Bernard Saluki Samoyed
    Schipperke Scotch Terrier Scottish Deerhound Sealyham Terrier
    Shetland Sheepdog Shih-Tzu Siberian Husky Silky Terrier
    Soft-coated Wheaten Terrier Staffordshire Bullterrier Standard
    Poodle Standard Schnauzer Sussex Spaniel Tibetan Mastiff Tibetan
    Terrier Toy Poodle Toy Terrier Vizsla Walker Hound
    Weimaraner Welsh Springer Spaniel West Highland White Terrier Whippet
    Wire-haired Fox Terrier Yorkshire Terrier`,
  },
];

export const dogFinderQuestions: ChatCompletionRequestMessage[] = [
  {
    role: "assistant",
    content: "Are you interested in a puppy, young, adult, or senior dog?",
  },
  {
    role: "assistant",
    content:
      "Do you prefer a dog that is more independent or one that seeks constant companionship?",
  },
  {
    role: "assistant",
    content:
      "Do you have any specific behavioral traits you'd like the dog to have (e.g., calm, obedient, protective)?",
  },
  {
    role: "assistant",
    content:
      "Are you open to regular grooming and maintenance if the dog has a high-maintenance coat?",
  },
];
