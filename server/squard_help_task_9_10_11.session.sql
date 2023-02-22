-- task 9
-- Вивести кількість юзерів за ролями {admin: 40, customer: 22, ...}

SELECT role, count(id) as count_of_users_with_role FROM "Users"
GROUP BY role;


-- task 10
-- Усім юзерам з роллю customer , які здійснювали замовлення в
-- новорічні свята в період з 25.12 по 14.01 , необхідно зарахувати
-- по 10% кешбеку з усіх замовлень у цей період.

WITH "NY_Customers" AS (
  SELECT "Users"."id", 0.1 * sum ("Contests"."prize") AS "cashback"
    FROM "Users"
    INNER JOIN "Contests" ON "Users"."id" = "Contests"."userId"
    WHERE "Contests"."createdAt" BETWEEN make_date( extract(year from CURRENT_DATE)::integer -1, 12, 25 ) AND make_date( extract(year from CURRENT_DATE)::integer, 1, 14 )
    AND "Users"."role" = 'customer'
    GROUP BY "Users"."id"
)
UPDATE "Users" 
SET "balance" = "Users"."balance" + "NY_Customers"."cashback"
FROM "NY_Customers"
WHERE "Users"."id" = "NY_Customers"."id"
RETURNING "Users".*



-- task 11
-- Для ролі сreative необхідно виплатити 3-м юзерам з найвищим
-- рейтингом по 10$ на їхні рахунки.

UPDATE "Users"
SET "balance" = "balance" + 10
WHERE "id" IN (
  SELECT "id"
  FROM "Users"
  WHERE "Users"."role" = 'creator'
  ORDER BY "rating" DESC
  LIMIT 3 OFFSET 0
)
RETURNING "Users".*




