#include <iostream>
#include <string>
using namespace std;

class Node
{
    public:
    int noMhs;
    Node*next;
    Node*prev;

};


class DoubleLinkedList
{
    private :
    Node*START;

    public:
    DoubleLinkedList()
    {
        START = NULL;
    }
    
    void addNode()
    {
        int nim;
        cout << "\nEnter the roll number of student :";
        cin >> nim;
       
        // Step 1 : Allocate memory for new mode
        Node*newMode = new Node();

        // Step 2 : Assign value to the data field
        newMode -> noMhs = nim;

        // Step 3 : Insert at beginning if list  empty or nim is
        if ( START == NULL || nim <= START -> noMhs )
        {
            if ( START != NULL && nim == START -> noMhs )
            {
                cout << "\nDuplicate number of allowed" <<endl;
                return;
            }
            // Step 4 : newMode.next = START
            newMode -> next = START;

            // Step 5 : START.prev = newMode (if START exist)
            {
            if (START !=NULL)
            START -> prev = newMode;

            // Step 6 : newMode.prev = NULL
            newMode -> prev = NULL;

            // Step 7 : START = newMode
            START = newMode;
            return;
            }

            // Insert in between mode
            // Step 8 : locate position for insertion

            Node*current = START;
            while (current -> next != NULL && current -> next -> noMhs < nim)
            {
                current = current -> next;
            }

            if (current -> next != NULL && nim == current -> next -> noMhs)
            {
                cout << "\nDuplicate rell number not allowed" << endl;
                return;
            }

            // Step 9 : Insert between current and current -> next
            newMode -> next = current -> next; // Step 9a : newMode.next =
            newMode -> prev = current; // Step 9b : newMode.prev

            // Insertion Last Node
            if (current -> next != NULL)
            current -> next -> prev = newMode; // Step 9c : current

            current -> next = newMode;  // Step 9d : current.next = newMode

        }

        void hapus ()
        {
            if (START == NULL)
            {
                cout << "\nlist is empty" << endl;
                return;
            }

            cout << "\nEnter the roll number of the student whose record is to be deleted" ;
            int rollNo;
            cin >> rollNo;

            Node * current = START;

            // Step 1 : Traverse the list to find the node
            while (current != NULL && current -> noMhs !=rollNo)
            current = current -> next;

            if (current == NULL)
            {
                cout << "Record not found" << endl;
                return;
            }

            // Step 2 : if node is at beginning
            if (current == START)
            {
                START = current -> next; // Step 2a : START = START.next
                if (START ! = NULL)
                START -> prev = NULL // Step 2b : START.prev = NULL
            }

            
        }
    }
};
