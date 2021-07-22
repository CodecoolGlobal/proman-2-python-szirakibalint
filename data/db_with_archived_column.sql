--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.boards_statuses DROP CONSTRAINT IF EXISTS fk_status_id;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_cards_status_id;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_cards_board_id;
ALTER TABLE IF EXISTS ONLY public.boards_statuses DROP CONSTRAINT IF EXISTS fk_board_id;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS statuses_pkey;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS cards_pkey;
ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS boards_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.statuses ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cards ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.boards ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.statuses_id_seq;
DROP TABLE IF EXISTS public.statuses;
DROP SEQUENCE IF EXISTS public.cards_id_seq;
DROP TABLE IF EXISTS public.cards;
DROP TABLE IF EXISTS public.boards_statuses;
DROP SEQUENCE IF EXISTS public.boards_id_seq;
DROP TABLE IF EXISTS public.boards;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: boards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.boards (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    user_id integer
);


--
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.boards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.boards_id_seq OWNED BY public.boards.id;


--
-- Name: boards_statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.boards_statuses (
    board_id integer,
    status_id integer
);


--
-- Name: cards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cards (
    id integer NOT NULL,
    board_id integer NOT NULL,
    status_id integer NOT NULL,
    title character varying(200) NOT NULL,
    card_order integer NOT NULL,
    archived boolean DEFAULT false
);


--
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cards_id_seq OWNED BY public.cards.id;


--
-- Name: statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.statuses (
    id integer NOT NULL,
    title character varying(200) NOT NULL
);


--
-- Name: statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.statuses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.statuses_id_seq OWNED BY public.statuses.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(200) NOT NULL,
    password text
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: boards id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.boards ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);


--
-- Name: cards id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cards ALTER COLUMN id SET DEFAULT nextval('public.cards_id_seq'::regclass);


--
-- Name: statuses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.statuses ALTER COLUMN id SET DEFAULT nextval('public.statuses_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.boards VALUES (2, 'Board 2', NULL);
INSERT INTO public.boards VALUES (4, 'alma', NULL);
INSERT INTO public.boards VALUES (1, 'kivi', NULL);
INSERT INTO public.boards VALUES (5, 'title', NULL);
INSERT INTO public.boards VALUES (6, 'private board', 3);
INSERT INTO public.boards VALUES (7, 'test 2 priv', 4);
INSERT INTO public.boards VALUES (8, 'publicboard', 3);
INSERT INTO public.boards VALUES (9, 'public??', 3);
INSERT INTO public.boards VALUES (10, 'public pls', 3);
INSERT INTO public.boards VALUES (11, 'public? finally?', NULL);


--
-- Data for Name: boards_statuses; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.boards_statuses VALUES (1, 1);
INSERT INTO public.boards_statuses VALUES (1, 2);
INSERT INTO public.boards_statuses VALUES (4, 1);
INSERT INTO public.boards_statuses VALUES (4, 2);
INSERT INTO public.boards_statuses VALUES (4, 3);
INSERT INTO public.boards_statuses VALUES (4, 4);
INSERT INTO public.boards_statuses VALUES (2, 2);
INSERT INTO public.boards_statuses VALUES (1, 4);
INSERT INTO public.boards_statuses VALUES (5, 1);
INSERT INTO public.boards_statuses VALUES (5, 2);
INSERT INTO public.boards_statuses VALUES (5, 3);
INSERT INTO public.boards_statuses VALUES (5, 4);
INSERT INTO public.boards_statuses VALUES (4, 5);
INSERT INTO public.boards_statuses VALUES (2, 6);
INSERT INTO public.boards_statuses VALUES (2, 7);
INSERT INTO public.boards_statuses VALUES (6, 1);
INSERT INTO public.boards_statuses VALUES (6, 2);
INSERT INTO public.boards_statuses VALUES (6, 3);
INSERT INTO public.boards_statuses VALUES (6, 4);
INSERT INTO public.boards_statuses VALUES (7, 1);
INSERT INTO public.boards_statuses VALUES (7, 2);
INSERT INTO public.boards_statuses VALUES (7, 3);
INSERT INTO public.boards_statuses VALUES (7, 4);
INSERT INTO public.boards_statuses VALUES (8, 1);
INSERT INTO public.boards_statuses VALUES (8, 2);
INSERT INTO public.boards_statuses VALUES (8, 3);
INSERT INTO public.boards_statuses VALUES (8, 4);
INSERT INTO public.boards_statuses VALUES (9, 1);
INSERT INTO public.boards_statuses VALUES (9, 2);
INSERT INTO public.boards_statuses VALUES (9, 3);
INSERT INTO public.boards_statuses VALUES (9, 4);
INSERT INTO public.boards_statuses VALUES (10, 1);
INSERT INTO public.boards_statuses VALUES (10, 2);
INSERT INTO public.boards_statuses VALUES (10, 3);
INSERT INTO public.boards_statuses VALUES (10, 4);
INSERT INTO public.boards_statuses VALUES (11, 1);
INSERT INTO public.boards_statuses VALUES (11, 2);
INSERT INTO public.boards_statuses VALUES (11, 3);
INSERT INTO public.boards_statuses VALUES (11, 4);


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cards VALUES (1, 1, 1, 'new card 1', 1, false);
INSERT INTO public.cards VALUES (2, 1, 1, 'new card 2', 2, false);
INSERT INTO public.cards VALUES (3, 1, 2, 'in progress card', 1, false);
INSERT INTO public.cards VALUES (6, 1, 4, 'done card 1', 2, false);
INSERT INTO public.cards VALUES (7, 2, 1, 'new card 1', 1, false);
INSERT INTO public.cards VALUES (8, 2, 1, 'new card 2', 2, false);
INSERT INTO public.cards VALUES (10, 2, 3, 'planning', 1, false);
INSERT INTO public.cards VALUES (12, 2, 4, 'done card 1', 2, false);
INSERT INTO public.cards VALUES (14, 2, 1, 'new new card', 2, false);
INSERT INTO public.cards VALUES (15, 2, 1, 'next new card', 2, false);
INSERT INTO public.cards VALUES (16, 2, 1, 'afadkjf', 2, false);
INSERT INTO public.cards VALUES (17, 2, 2, 'asda', 1, false);
INSERT INTO public.cards VALUES (18, 2, 2, 'asdasdsada', 2, false);


--
-- Data for Name: statuses; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.statuses VALUES (1, 'new');
INSERT INTO public.statuses VALUES (2, 'in progress');
INSERT INTO public.statuses VALUES (3, 'testing');
INSERT INTO public.statuses VALUES (4, 'done');
INSERT INTO public.statuses VALUES (5, 'adad');
INSERT INTO public.statuses VALUES (6, 'testing 2');
INSERT INTO public.statuses VALUES (7, 'new 2');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'rabbitlol', '$2b$12$r0Af48HQyh1iyqPtFEk7Tu83uW8CtUtT4xph0cqiDQ/hGxryRz.ES');
INSERT INTO public.users VALUES (2, 'missy', '$2b$12$pmJ4Oqy7alCVLKAygnc8VOAbdF1jod0.b2a/iTnmIfgZRSUl24NJ2');
INSERT INTO public.users VALUES (3, 'testprivateboard', '$2b$12$8GdPqQ2FLg4bLNKb3oWzMu.iMr9x6.O.J6Id/bebGahmJGRSQLgX.');
INSERT INTO public.users VALUES (4, 'privatetest2', '$2b$12$LlresO0qQS.d7vMImMjkt.7qS0ri6qbF1xQScvaI7ZgQbPMA4CsmW');


--
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.boards_id_seq', 11, true);


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cards_id_seq', 18, true);


--
-- Name: statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.statuses_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: boards boards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: statuses statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: boards_statuses fk_board_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.boards_statuses
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES public.boards(id);


--
-- Name: cards fk_cards_board_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES public.boards(id);


--
-- Name: cards fk_cards_status_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT fk_cards_status_id FOREIGN KEY (status_id) REFERENCES public.statuses(id);


--
-- Name: boards_statuses fk_status_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.boards_statuses
    ADD CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES public.statuses(id);


--
-- PostgreSQL database dump complete
--

