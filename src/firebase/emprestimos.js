import { addDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { emprestimosCollection } from "./collections";

export async function adicionarEmprestimo(data) {
    await addDoc(emprestimosCollection, data)
}

export async function pegarEmprestimos() {
    const snapshot =  await getDocs(emprestimosCollection)
    let emprestimos = [];
    snapshot.forEach((doc) => {
    emprestimos.push({ ...doc.data(), id: doc.id });
    });
    return emprestimos;
  }

export async function getEmprestimo(id) {
    const snapshot = await getDoc(doc(emprestimosCollection, id));
    return {...snapshot.data(), id: snapshot.id}
}

export async function updateEmprestimo(id, data) {
    await updateDoc(doc(emprestimosCollection, id), data)
}