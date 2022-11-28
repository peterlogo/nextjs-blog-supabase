import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Navbar, Button, Text } from "@nextui-org/react";
import Link from "next/link";

const NavbarComponent = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const signOutUser = () => {
    supabaseClient.auth.signOut();
    router.push("/");
  };

  return (
    <Navbar isBordered isCompact>
      <Navbar.Brand as={Link} href="/">
        Share Articles
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="highlight-rounded">
        <Navbar.Link href="/mainfeed">Main Feed</Navbar.Link>
        <Navbar.Link href="/create">Create Articles</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        {!user ? (
          <>
            <Navbar.Link href="/login">
              <Button auto flat>
                Login
              </Button>
            </Navbar.Link>
          </>
        ) : (
          <>
            <Navbar.Item>
              <Text>Hey, {user?.email}</Text>
            </Navbar.Item>
            <Navbar.Item>
              <Button auto flat onPress={() => signOutUser()}>
                Sign Out
              </Button>
            </Navbar.Item>
          </>
        )}
      </Navbar.Content>
    </Navbar>
  );
};

export default NavbarComponent;
